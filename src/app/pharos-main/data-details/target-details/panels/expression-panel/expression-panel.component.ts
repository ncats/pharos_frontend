import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {HeatMapData} from '../../../../../tools/visualizations/heat-map/heat-map.component';
import {takeUntil} from 'rxjs/operators';
import {TourType} from '../../../../../models/tour-type';
import {ExpressionInfoService} from "../../../../../pharos-services/expression-info.service";

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
  shadingKey = 'JensenLab TISSUES';
  redrawAnatomogram: Subject<boolean> = new Subject<boolean>();
  uberonExpressionMap: HeatMapData;
  selectedUberon: any;
  clickedTissue: string;
  detailsTissue: string;
  sortedTrees: any[];
  /**
   * target id
   */
  id: string;
  tourType: TourType;

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
    public dynamicServices: DynamicServicesService,
    private expressionInfoService: ExpressionInfoService
  ) {
    super(dynamicServices);
  }
  dataSourceClicked(input, source) {
    this.shadingKey = input;
  }

  tissueClicked(input, source) {
    let uberonObj = this.expressionInfoService.get(input);
    const tissue = uberonObj?.name;
    const uberon = uberonObj?.uid;
    if (source === 'anatomogram') {
      if (tissue === this.clickedTissue) {
        this.clickedTissue = '';
      } else {
        this.clickedTissue = tissue;
        this.detailsTissue = '';
      }
    }
    if (source === 'heatmap') {
      if (tissue === this.detailsTissue) {
        this.detailsTissue = '';
      } else {
        this.detailsTissue = tissue;
      }
    }
    this.changeRef.detectChanges();
  }

  /**
   * subscribe to data changes and generate tree
   */
  ngOnInit() {
    this.selectedUberon = this.expressionInfoService.focusedUberon;
    this.expressionInfoService.focusedUberonChanged.subscribe(selectedUberon => {
      this.selectedUberon = selectedUberon;
    });
    this.tourType = TourType.TargetExpressionTour;
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (isPlatformBrowser(this.platformID)) {
          this.tissues = [];
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;
          this.setterFunction();
          if (this.uberonExpressionMap.yValues.length > 0) {
            this.showSection();
          } else {
            this.hideSection();
          }
          this.loadingComplete();
          this.changeRef.detectChanges();
        }
      });
  }

  closeDetails() {
    this.detailsTissue = '';
  }

  updateHeatmapData() {
    this.uberonExpressionMap = new HeatMapData('Data Source', 'Tissue', 'JensenLab TISSUES');
    this.uberonExpressionMap.xSortFunction = this.sortDataSources.bind(this);
    this.setMapData(this.uberonExpressionMap, this.target?.expressions, this.target?.gtex);
  }
  source2color(source: string): string {
    const num = this.source2number(source);
    switch (num){
      case 1:
        return '#ff743a';
      case 2:
        return '#337bb7';
      case 3:
        return '#ffcf3a';
    }
  }
  source2type(source: string): string {
    const num = this.source2number(source);
    switch (num){
      case 1:
        return 'Consensus';
      case 2:
        return 'RNA Expression';
      case 3:
        return 'Protein Expression';
    }
  }
  source2number(source: string): number{
    if (source.includes('JensenLab')) {
      return 1;
    }
    if (source.includes('Protein')) {
      return 3;
    }
    return 2;
  }
  sortDataSources(x1, x2) {
    const n1 = this.source2number(x1.val);
    const n2 = this.source2number(x2.val);
    if (n1 === n2) {
      return x1.val.localeCompare(x2.val);
    }
    return n1 - n2;
  }

  addToShadingMap(type, uid, value) {
    let existingMap;
    if (uid && uid.startsWith('UBERON')) {
      if (this.shadingMap.has(type)) {
        existingMap = this.shadingMap.get(type);
      } else {
        existingMap = new Map<string, number>();
        this.shadingMap.set(type, existingMap);
      }
      if (existingMap.has(uid)) {
        const existingVal = existingMap.get(uid);
        if (value > existingVal) {
          existingMap.set(uid, value);
        }
      } else {
        existingMap.set(uid, value);
      }
    }
  }

  setMapData(heatMapData: HeatMapData, expressionList: any[] = [], gtexList: any[] = []) {
    const dsList: string[] = [];
    expressionList.forEach(expression => {
      if (!dsList.includes(expression.type)){
        heatMapData.addPoint(
          expression.type, 'Expression Type', this.source2type(expression.type), 2,
          null, {color: this.source2color(expression.type), hideRank: true});
        dsList.push(expression.type);
      }
        const field = ExpressionPanelComponent.getPreferredField(expression.type);
        if (expression.uberon) {
          if (!this.tissues.includes(expression.uberon.uid)) {
            this.tissues.push(expression.uberon.uid);
          }
          const obj = {name: expression.uberon.name, uid: expression.uberon.uid};
          this.expressionInfoService.trySet(obj);
        }
        heatMapData.addPoint(
          expression.type,
          expression.uberon?.name || expression.tissue,
          (expression[field] || '') + (ExpressionPanelComponent.getLabel(expression.type) ? ' ' + ExpressionPanelComponent.getLabel(expression.type) : ''),
          expression.type === 'JensenLab TISSUES' ? expression.value / 5 : expression.sourceRank,
          expression.uberon, {
            valueLabel: expression.type === 'JensenLab TISSUES' ? 'Confidence' : null,
            hideRank: expression.type === 'JensenLab TISSUES' ? true : false
          });
        this.addToShadingMap(expression.type, expression.uberon?.uid,
          expression.type === 'JensenLab TISSUES' ? expression.value / 5 : expression.sourceRank);
      });
    const gtexmale = 'GTEx - Male';
    const gtexfemale = 'GTEx - Female';
    gtexList.forEach(expression => {
      if (!dsList.includes('GTEx')){
        heatMapData.addPoint(gtexmale, 'Expression Type', this.source2type('GTEx - Male'), 2,
          null, {color: this.source2color(gtexmale), hideRank: true});
        heatMapData.addPoint(gtexfemale, 'Expression Type', this.source2type('GTEx - Female'), 2,
          null, {color: this.source2color(gtexfemale), hideRank: true});
        dsList.push('GTEx');
      }
      if (expression.uberon) {
        if (!this.tissues.includes(expression.uberon.uid)) {
          this.tissues.push(expression.uberon.uid);
        }
        const obj = {name: expression.uberon.name, uid: expression.uberon.uid};
        this.expressionInfoService.trySet(obj);
      }
      this.addToShadingMap(gtexmale, expression.uberon?.uid, expression.tpm_rank);
      this.addToShadingMap(gtexfemale, expression.uberon?.uid, expression.tpm_rank);
      if (expression.tpm_male) {
        heatMapData.addPoint(gtexmale, expression.uberon?.name || expression.tissue,
          expression.tpm_male + ' TPM', expression.tpm_male_rank, expression.uberon, {});
      }
      if (expression.tpm_female) {
        heatMapData.addPoint(gtexfemale, expression.uberon?.name || expression.tissue,
          expression.tpm_female + ' TPM', expression.tpm_female_rank, expression.uberon, {});
      }
    });
  }

  /**
   * parse and generate data
   */
  setterFunction() {
    this.sortedTrees = this.target.expressionTree.uberonDict.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
    for(let root of this.sortedTrees) {
      this.setUberonInfo(root);
    }
    this.updateHeatmapData();
  }
  setUberonInfo(node){
    const uberonObj = {uid: node.uid, name: node.name};
    if (this.expressionInfoService.trySet(uberonObj)) {
      node.children.forEach(child => {
        this.setUberonInfo(child);
      });
    }
  }

  static getPreferredField(dataSource: string): string {
    switch (dataSource) {
      case 'HPA Protein':
        return 'qual';
      default:
        return 'value';
    }
  }
  static getLabel(dataSource: string): string {
    if (dataSource.includes('RNA')) {
      return 'TPM';
    }
    return '';
  }

}
