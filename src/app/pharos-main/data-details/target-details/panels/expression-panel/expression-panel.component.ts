import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

// todo: clean up tabs css when this is merges/released: https://github.com/angular/material2/pull/11520
/**
 * expression panel component
 */
@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.scss']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * target to display
   */
  @Input() target: Target;
  @Input() targetProps: any;

  /**
   * tissues to display, currently contains dummy data
   */
  tissues: string[] = [];
  shadingKey: string;
  shadingMap: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  redrawAnatamogram: Subject<boolean> = new Subject<boolean>();

  tissueCount(sortKey: string) {
    return this.tissueCountFromMap(this.shadingMap.get(sortKey));
  }

  tissueCountFromMap(map) {
    return Array.from(map).length;
  }

  sortChanged(sortObject) {
    this.clickedTissue = "";
    this.changeRef.detectChanges();
    this.setExpressionList();
    this.redrawAnatamogram.next(true);
    var scrollWindow = this.expressionList.nativeElement;
    scrollWindow.scrollTop = 0;
  }

  @ViewChild("expression_card_list") expressionList: ElementRef;
  @ViewChild("cell_lines_card_list") cellLinesList: ElementRef;

  tissueClicked(tissue) {
    this.searchString = "";
    this.clickedTissue = tissue;
    this.setExpressionList();
    var scrollWindow = this.expressionList.nativeElement;
    scrollWindow.scrollTop = 0;
  }

  clickedTissue: string;

  /**
   * target id
   */
  id: string;

  uberonMap: Map<string, any> = new Map<string, any>();
  cellLinesMap: Map<string, any> = new Map<string, any>();
  sortedCellLines: string[];
  sortedExpressions: any[];
  searchString: string = "";
  searchCLString: string = "";
  alphabetized: boolean = false;
  alphabetizedCellLines: boolean = false;

  /**
   * attach required services
   * @param pharosApiService
   * @param _route
   * @param navSectionsService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: Object,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }
  /**
   * subscribe to data changes and generate tree
   */
  ngOnInit() {
      this._data
        // listen to data as long as term is undefined or null
        // Unsubscribe once term has value
        .pipe(
          // takeUntil(this.ngUnsubscribe)
        )
        .subscribe(x => {
          if(isPlatformBrowser(this.platformID)){
            this.tissues = [];
            this.uberonMap.clear();
            this.cellLinesMap.clear();
            this.target = this.data.targets;
            this.targetProps = this.data.targetsProps;
            this.setterFunction();
            this.loadingComplete();
          }
        });
  }
  /**
   * parse and generate data
   */
  setterFunction() {
    this.target.expressions.forEach(expression => {
      if (expression.uberon && expression.uberon.uid && expression.uberon.uid.substring(0, 6).toUpperCase() === "UBERON") {
        this.addToShadingMap(expression);

        const uberon = expression.uberon.uid;
        this.tissues.push(uberon);
        const exprList = this.uberonMap.get(uberon);
        if (exprList) {
          exprList.push(expression);
          this.uberonMap.set(uberon, exprList);
        } else {
          this.uberonMap.set(uberon, [expression]);
        }
      } else {
        const cellLineName = expression.uberon?.uid || expression.tissue;
        const exprList = this.cellLinesMap.get(cellLineName);
        if (exprList) {
          exprList.push(expression);
          this.cellLinesMap.set(cellLineName, exprList);
        } else {
          this.cellLinesMap.set(cellLineName, [expression]);
        }
      }
    });
    this.shadingMap = new Map([...this.shadingMap.entries()].sort((a, b) => {
      return this.tissueCount(b[0]) - this.tissueCount(a[0]);
    }));
    this.shadingKey = Array.from(this.shadingMap.keys())[0];

    this.setCellLinesList();
    this.setExpressionList();
    this.changeRef.markForCheck();
    this.loadingComplete();
  }

  addToShadingMap(expression: any) {
    let existingMap = this.shadingMap.get(expression.type);
    if (!existingMap) {
      existingMap = new Map<string, number>();
      this.shadingMap.set(expression.type, existingMap);
    }
    this.setShadingValue(existingMap, expression, expression.type);
  }

  setShadingValue(valueMap: Map<string, number>, expression: any, dataSource: string) {
    let currentValue = valueMap.get(expression.uberon.uid);
    let field = ExpressionPanelComponent.getPreferredField(dataSource);
    if (currentValue == null) {
      valueMap.set(expression.uberon.uid, this.mapValue(expression[field], field));
    } else {
      valueMap.set(expression.uberon.uid, Math.max(this.mapValue(expression[field], field), currentValue));
    }
  }

  getPreferredField(dataSource: string): string {
    return ExpressionPanelComponent.getPreferredField(dataSource);
  }

  static getPreferredField(dataSource: string): string {
    switch (dataSource) {
      case "Consensus":
      case "HCA RNA":
      case "HPA":
      case "HPM Gene":
      case "HPM Protein":
        return "qual";
      case "JensenLab Text Mining":
        return "zscore";
      default:
        return "value";
    }
  }

  mapValue(value: string, key: string): number {
    if (key === "qual") {
      switch (value) {
        case "Low":
          return 0.2;
          break;
        case "Medium":
          return 0.6;
          break;
        case "High":
          return 1;
          break;
        default:
          return 0;
      }
    } else if (key === "value") {
      if (!value) return 0;
      return Number(value.split(' ')[0]);
    }
    return Number(value);
  }


  setExpressionList() {
    if (this.searchString === "") {
      this.sortedExpressions = [...this.uberonMap.values()];
    } else {
      this.sortedExpressions = [...this.uberonMap.values()].filter(expression => {
        return expression[0].uberon.name.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
      });
    }
    if (this.alphabetized) {
      this.sortedExpressions = this.sortedExpressions.sort((a, b) => {
        if (a[0].uberon.uid === this.clickedTissue) return -1;
        if (b[0].uberon.uid === this.clickedTissue) return 1;
        return a[0].uberon.name.localeCompare(b[0].uberon.name);
      });
    } else {
      this.sortedExpressions = this.sortedExpressions.sort((a, b) => {
        if (a[0].uberon.uid === this.clickedTissue) return -1;
        if (b[0].uberon.uid === this.clickedTissue) return 1;
        if (this.listHasType(a, this.shadingKey) && this.listHasType(b, this.shadingKey)) {
          return this.getMaxExpression(b) - this.getMaxExpression(a);
        }
        if (this.listHasType(a, this.shadingKey)) {
          return -1;
        }
        if (this.listHasType(b, this.shadingKey)) {
          return 1;
        }
        return a[0].tissue.localeCompare(b[0].tissue);
      })
    }
  }

  setCellLinesList() {
    if (this.alphabetizedCellLines) {
      this.sortedCellLines = Array.from(this.cellLinesMap.keys()).sort((a, b) => {
        return a.localeCompare(b);
      });
    } else {
      this.sortedCellLines = Array.from(this.cellLinesMap.keys()).sort((a, b) => {
        let a_data = this.cellLinesMap.get(a);
        let b_data = this.cellLinesMap.get(b);
        let a_prop = a_data.map(expr => this.mapValue(expr[this.getPreferredField(expr.type)], this.getPreferredField(expr.type))).filter(a => a > 0).length;
        let b_prop = b_data.map(expr => this.mapValue(expr[this.getPreferredField(expr.type)], this.getPreferredField(expr.type))).filter(a => a > 0).length;
        if (a_prop === b_prop) {
          if (a_data.length === b_data.length) {
            return a.localeCompare(b);
          }
          return b_data.length - a_data.length;
        }
        return b_prop - a_prop;
      });
    }
    if (this.searchCLString.length > 0) {
      this.sortedCellLines = this.sortedCellLines.filter(a => {
        return a.toLowerCase().indexOf(this.searchCLString.toLowerCase()) > -1;
      });
    }
  }

  listHasType(expArray: any[], type: string): boolean {
    return !!expArray.find(a => a.type === type);
  }

  getMaxExpression(expArray: any[]) {
    let field = ExpressionPanelComponent.getPreferredField(this.shadingKey);
    return Math.max(...expArray.filter(a => a.type === this.shadingKey).map(a => this.mapValue(a[field], field)));
  }

  filterTissues(search: string) {
    this.searchString = search;
    this.setExpressionList();
  }

  filterCellLines(search: string) {
    this.searchCLString = search;
    this.setCellLinesList();
  }

  alphabetize(event) {
    this.alphabetized = !this.alphabetized;
    this.clickedTissue = "";
    this.setExpressionList();
    var scrollWindow = this.expressionList.nativeElement;
    scrollWindow.scrollTop = 0;
  }

  alphabetizeCellLines(event) {
    this.alphabetizedCellLines = !this.alphabetizedCellLines;
    this.setCellLinesList();
    var scrollWindow = this.cellLinesList.nativeElement;
    scrollWindow.scrollTop = 0;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
