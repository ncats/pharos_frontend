import {ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {HeatMapData} from '../../../../../tools/visualizations/heat-map/heat-map.component';

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
  shadingMap: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  redrawAnatamogram: Subject<boolean> = new Subject<boolean>();
  uberonExpressionMap: HeatMapData;
  clickedTissue: string;

  /**
   * target id
   */
  id: string;
  uberonMap: Map<string, any> = new Map<string, any>();
  uberon2Tissue: Map<string, string> = new Map<string, string>();
  cellLinesMap: Map<string, any> = new Map<string, any>();

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
    @Inject(PLATFORM_ID) private platformID: any,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  tissueClicked(uberon) {
    console.log(uberon);
    this.clickedTissue = this.uberon2Tissue.get(uberon);
    this.changeRef.detectChanges();
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
        if (isPlatformBrowser(this.platformID)) {
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

  updateHeatmapData() {
    this.uberonExpressionMap = new HeatMapData('Data Source', 'Tissue');
    this.setMapData(this.uberonExpressionMap, this.target.expressions, this.target.gtex);
  }

  setMapData(heatMapData: HeatMapData, expressionList: any[], gtexList: any[]) {
    this.uberon2Tissue.clear();
    expressionList.forEach(expression => {
        const field = ExpressionPanelComponent.getPreferredField(expression.type);
        if (expression.uberon) {
          if (!this.tissues.includes(expression.uberon.uid)) {
            this.tissues.push(expression.uberon.uid);
          }
          this.uberon2Tissue.set(expression.uberon.name, expression.uberon.uid);
          this.uberon2Tissue.set(expression.uberon.uid, expression.uberon.name);
        }
        heatMapData.addPoint(expression.type,
          expression.uberon?.name || expression.tissue, expression[field], expression.sourceRank, expression.uberon?.uid);
      });
    gtexList.forEach(expression => {
      if (expression.gender === 'M') {
        if (expression.uberon) {
          if (!this.tissues.includes(expression.uberon.uid)) {
            this.tissues.push(expression.uberon.uid);
          }
          this.uberon2Tissue.set(expression.uberon.name, expression.uberon.uid);
          this.uberon2Tissue.set(expression.uberon.uid, expression.uberon.name);
        }
        heatMapData.addPoint('GTEX - Male', expression.uberon?.name || expression.tissue,
          expression.tpm + ' TPM', expression.tpm_rank, expression.uberon?.uid);
      }
      else {
        if (expression.uberon) {
          if (!this.tissues.includes(expression.uberon.uid)) {
            this.tissues.push(expression.uberon.uid);
          }
          this.uberon2Tissue.set(expression.uberon.name, expression.uberon.uid);
          this.uberon2Tissue.set(expression.uberon.uid, expression.uberon.name);
        }
        heatMapData.addPoint('GTEX - Female', expression.uberon?.name || expression.tissue,
          expression.tpm + ' TPM', expression.tpm_rank, expression.uberon?.uid);
      }
    });
    heatMapData.yValues.forEach(y => {
      const list = [];
      heatMapData.xValues.forEach(x => {
        const key = heatMapData.key(x.val, y.val);
        if (heatMapData.data.has(key)) {
          const val = heatMapData.data.get(key);
          list.push(val.val);
        }
      });
      const avg = list.reduce((a, b) => a + b) / list.length;
      const uberon = this.uberon2Tissue.get(y.val);
      heatMapData.addPoint('Average', y.val, avg.toString(), avg, uberon);
      let existingMap = this.shadingMap.get('Average');

      if (!existingMap) {
        existingMap = new Map<string, number>();
        this.shadingMap.set('Average', existingMap);
      }

      existingMap.set(uberon, avg);
    });
  }

  /**
   * parse and generate data
   */
  setterFunction() {
    this.updateHeatmapData();
    this.changeRef.markForCheck();
    this.loadingComplete();
  }

  static getPreferredField(dataSource: string): string {
    switch (dataSource) {
      case 'CCLE':
      case 'HCA RNA':
      case 'HPM Gene':
      case 'HPM Protein':
      case 'JensenLab Text Mining':
        return 'value';
      case 'Consensus':
      case 'HPA':
        return 'qual';
      default:
        return 'value';
    }
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
