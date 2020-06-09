import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {Target} from '../../../../../models/target';
import {PharosPoint} from '../../../../../models/pharos-point';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';

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
   * tnx data
   */
  tinx: PharosPoint[];

  /**
   * tissues to display, currently contains dummy data
   */
  tissues: string[] = [];

  tissueClicked(tissue) {
    this.searchString = "";
    this.clickedTissue = tissue;
    this.setExpressionList();
    var scrollWindow = window.document.getElementById('expression-card-list');
    scrollWindow.scrollTop = 0;
  }

  clickedTissue: string;
  /**
   * radar chart component for differential data
   */
  @ViewChild('radar', {read: RadarChartComponent}) radarComponent: RadarChartComponent;

  /**
   * target id
   */
  id: string;

  uberonMap: Map<string, any> = new Map<string, any>();

  sortedExpressions: any[];

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
    private navSectionsService: NavSectionsService
  ) {
    super();
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
        this.tissues = [];
        this.uberonMap.clear();
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;
        this.setterFunction();
        this.loading = false;
      });
  }

  /**
   * parse and generate data
   */
  setterFunction() {
    this.target.expressions.forEach(expression => {
      if (expression.uberon && expression.uberon.uid) {
        expression.uberon.uid = expression.uberon.uid.replace(':', '_');
        const uberon = expression.uberon.uid;
        this.tissues.push(uberon);
        const uberons = this.uberonMap.get(uberon);
        if (uberons) {
          uberons.push(expression);
          this.uberonMap.set(uberon, uberons);
        } else {
          this.uberonMap.set(uberon, [expression]);
        }
      }
      this.changeRef.markForCheck();
    });

    this.setExpressionList();
    this.loading = false;
  }

  searchString: string = "";
  alphabetized: boolean = false;

  setExpressionList(){
    if (this.searchString === "") {
      this.sortedExpressions = [...this.uberonMap.values()];
    }
    else {
      this.sortedExpressions = [...this.uberonMap.values()].filter(expression => {
        return expression[0].uberon.name.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
      });
    }
    if (this.alphabetized) {
      this.sortedExpressions = this.sortedExpressions.sort((a, b) => {
        if (a[0].uberon.uid === this.clickedTissue) return -1;
        if (b[0].uberon.uid === this.clickedTissue) return 1;
        return a[0].uberon.name.localeCompare(b[0].uberon.name);});
    } else {
      this.sortedExpressions = this.sortedExpressions.sort((a, b) => {
        if (a[0].uberon.uid === this.clickedTissue) return -1;
        if (b[0].uberon.uid === this.clickedTissue) return 1;
        return b.length - a.length;});
    }
  }

  filterTissues(search: string) {
    this.searchString = search;
    this.setExpressionList();
  }

  alphabetize(event) {
    this.alphabetized = !this.alphabetized;
    this.clickedTissue = "";
    this.setExpressionList();
    var scrollWindow = window.document.getElementById('expression-card-list');
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
