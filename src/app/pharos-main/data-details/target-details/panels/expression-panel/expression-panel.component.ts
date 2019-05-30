import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatTabChangeEvent} from '@angular/material';
import {PharosProperty} from '../../../../../models/pharos-property';
import {BehaviorSubject} from 'rxjs/index';
import {Ortholog, OrthologSerializer} from '../../../../../models/ortholog';
import {DiseaseRelevance} from '../../../../../models/disease-relevance';
import {takeUntil} from 'rxjs/operators';
import {DiseaseRelevanceSerializer} from '../../../../../models/disease-relevance';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {AnatamogramHoverService} from '../../../../../tools/anatamogram/anatamogram-hover.service';
import {PharosConfig} from '../../../../../../config/pharos-config';

// todo: clean up tabs css when this is merges/released: https://github.com/angular/material2/pull/11520
@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.scss']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit {
  tissues: string[] = [
    'UBERON_0001897',
    'UBERON_0001898',
    'UBERON_0002421',
    'UBERON_0003027',
    'UBERON_0001876',
    'UBERON_0001870',
    'UBERON_0001871',
    'UBERON_0001021',
    'UBERON_0006618',
    'UBERON_0012249',
    'UBERON_0002421',
    'UBERON_0000977',
    'UBERON_0002185',
    'UBERON_0003126',
    'UBERON_0002048',
    'UBERON_0002372',
    'UBERON_0000970',
    'UBERON_0001876',
    'UBERON_0001736',
    'UBERON_0001264',
    'UBERON_0002107',
    'UBERON_0001155',
    'UBERON_0002371',
    'UBERON_0001255',
    'UBERON_0000945',
    'UBERON_0002114',
    'UBERON_0001000',
    'UBERON_0000998',
    'UBERON_0000473',
    'UBERON_0001301',
    'UBERON_0000970',
    'UBERON_0002372',
    'UBERON_0002048',
    'UBERON_0001876',
    'UBERON_0003126',
    'UBERON_0002185',
    'UBERON_0001021',
    'UBERON_0002037',
    'UBERON_0002245',
    'UBERON_0002113',
    'UBERON_0001225',
    'UBERON_0002046',
    'UBERON_0002371',
    'UBERON_0001870'
  ];

  @ViewChild(RadarChartComponent, {static: true}) radarComponent: RadarChartComponent;

  _URL: string;
  id: string;
  tissueData: Map<string, PharosProperty[]> = new Map<string, PharosProperty[]>();
  diseaseRelevanceSerializer: DiseaseRelevanceSerializer = new DiseaseRelevanceSerializer();
  orthologSerializer: OrthologSerializer = new OrthologSerializer();
  hgData: any[] = [];
  imgUrl: string;
  diseaseSources: any;
  orthologs: any;
  tableArr: any[];
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'IDG Disease',
      label: 'Disease',
      sortable: true
    }),

    new PharosProperty({
        name: 'log2foldchange',
        label: 'log2 FC',
        sortable: true
      }
    ),

    new PharosProperty({
        name: 'pvalue',
        label: 'P-value',
        sortable: true,
        sorted: 'desc'
      }
    )];

  /**
   * initialize a private variable _radarData, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _radarData = new BehaviorSubject<any>([]);
  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set radarData(value: any) {
    this._radarData.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get radarData() {
    return this._radarData.getValue();
  }

  sources: any[] = [
    {label: 'GTEx Tissue', name: 'gtex'},
    {label: 'HPM Tissue', name: 'hpm'},
    {label: 'HPA RNA Tissue', name: 'hpa'},
    {label: 'IDG Tissue', name: 'gtex'},
    {label: 'UniProt Tissue', name: 'uniprot'},
    {label: 'Jensen-KB Tissue', name: 'jensen-kb'},
    {label: 'Jensen-TM Tissue', name: 'jensen-tm'},
    {label: 'IDG Tissue Ref', name: 'gtex'}
  ];

  sourceList = [];
  selectedTab: string;

  constructor(private navSectionsService: NavSectionsService,
              private pharosConfig: PharosConfig,
              private anatamogramHoverService: AnatamogramHoverService) {
    super();
  }

  ngOnInit() {
    this._URL = this.pharosConfig.getHomunculusUrl(this.id);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
  }

  setterFunction() {
    if (this.data.expression) {
      this.tissueData.clear();
      this.mapTissueData();
      this.radarData = this.setRadarData();
      this.hgData = this.tissueData.get(this.sources[0].label);
      this.imgUrl = this._URL + this.sourceList[0].name;
    }
    if (this.data.differential) {
      this.tableArr = [];
      this.diseaseSources = this.data.differential.filter(term =>
        term.properties.filter(prop => prop.term === 'Expression Atlas').length > 0);
      this.diseaseSources.forEach(dr => {
        // create new disease relevance object to get PharosProperty class properties
        const readDR: DiseaseRelevance = this.diseaseRelevanceSerializer.fromJson(dr);
        // get array of diseases from source map
        const tableData: any = {};
        readDR.properties.forEach(prop => {
          tableData[prop.label] = new PharosProperty(prop);
        });
        this.tableArr.push(tableData);
      });
    }


    if (this.data.orthologs) {
      this.orthologs = [];
      const temp: Ortholog[] = [];
      this.data.orthologs.forEach(obj => {
        // create new object to get PharosProperty class properties
        const newObj: Ortholog = this.orthologSerializer.fromJson(obj);
        // get source label
        const labelProp: PharosProperty =
          new PharosProperty(newObj.properties.filter(prop => prop.label === 'Ortholog Species')[0]);
        const dataSources: PharosProperty[] =
          newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => new PharosProperty(lab));
        this.orthologs.push({species: labelProp, source: dataSources});
      });
    }
  }

  mapTissueData(): void {
    this.data.expression.forEach(tissue => {
      const tissueTerm: PharosProperty = new PharosProperty(tissue);
      const tissueArr: PharosProperty[] = this.tissueData.get(tissueTerm.label);
      if (tissueArr) {
        tissueArr.push(tissueTerm);
        this.tissueData.set(tissueTerm.label, tissueArr);
      } else {
        this.tissueData.set(tissueTerm.label, [tissueTerm]);
      }
    });
    const keys = Array.from(this.tissueData.keys());
    this.sourceList = this.sources.filter(source => keys.includes(source.label));
  }

  setRadarData(): any[] {
    const axes: any [] = [];
    const radar: any = [];
    const filters = ['GTEx Tissue Specificity Index', 'HPM Protein Tissue Specificity Index', 'HPA RNA Tissue Specificity Index'];
    filters.forEach(field => {
      const data: any = this.tissueData.get(field) ? this.tissueData.get(field)[0] : {numval: 0};
      axes.push({axis: field, value: data['numval']});
    });
    radar.push({className: this.id, axes: axes});
    return radar;
  }

  getData(field: string): PharosProperty[] {
    return this.tissueData.get(field);
  }

  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  changeHarminogramTabData(event: MatTabChangeEvent) {
    this.hgData = this.tissueData.get(this.sourceList[event.index].label);
    this.imgUrl = this._URL + this.sourceList[event.index].name;

  }

  drawRadar(change: MatTabChangeEvent) {
    this.selectedTab = change.tab.textLabel;
  }

  /**
   * set tissue that is hovered from list
   * @param {string} tissue
   */
  setHover(tissue?: string) {
    this.anatamogramHoverService.setTissue(tissue);
  }

  /**
   * redraws radar chart when the tab changes, this is due to the lazy loaded tabs
   */
  doneAnimating() {
    if (this.selectedTab === 'Specificity') {
      this.radarComponent.drawChart();
      this.radarComponent.updateChart();
    }
  //  this.imgUrl = this._URL + this.sources[0].name;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
