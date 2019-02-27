import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatTabChangeEvent} from '@angular/material';
import {Property} from '../../../../../models/property';
import {BehaviorSubject} from 'rxjs/index';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {Ortholog} from '../../../../../models/ortholog';
import {TableData} from '../../../../../models/table-data';
import {DiseaseRelevance} from '../../../../../models/disease-relevance';
import {takeUntil} from 'rxjs/operators';

// todo: clean up tabs css when this is merges/released: https://github.com/angular/material2/pull/11520
@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.scss']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit {
  _URL: string;
  id: string;
  tissueData: Map<string, Property[]> = new Map<string, Property[]>();
  hgData: any[] = [];
  imgUrl: string;
  diseaseSources: any;
  orthologs: any;
  tableArr: any[];
  fields: TableData[] = [
    new TableData({
      name: 'IDG Disease',
      label: 'Disease',
      sortable: true,
      internalLink: true
    }),

    new TableData({
        name: 'log2foldchange',
        label: 'log2 FC',
        sortable: true
      }
    ),

    new TableData({
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
  width = 30;

  constructor(private environmentVariablesService: EnvironmentVariablesService) {
    super();
  }

  ngOnInit() {
    this._URL = this.environmentVariablesService.getHomunculusUrl(this.id);
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
      this.imgUrl = this._URL + this.sources[0].name;
    }
    if (this.data.differential) {
      this.tableArr = [];
      this.diseaseSources = this.data.differential.filter(term =>
        term.properties.filter(prop => prop.term === 'Expression Atlas').length > 0);
      this.diseaseSources.forEach(dr => {
        // create new disease relevance object to get Property class properties
        const readDR = new DiseaseRelevance(dr);
        // get array of diseases from source map
        const tableData: any = {};
        readDR.properties.forEach(prop => {
          tableData[prop.label] = new Property(prop);
        });
        this.tableArr.push(tableData);
      });
    }


    if (this.data.orthologs) {
      this.orthologs = [];
      const temp: Ortholog[] = [];
      this.data.orthologs.forEach(obj => {
        // create new object to get Property class properties
        const newObj: Ortholog = new Ortholog(obj);
        // get source label
        const labelProp: Property = new Property(newObj.properties.filter(prop => prop.label === 'Ortholog Species')[0]);
        const dataSources: Property[] = newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => new Property(lab));
        this.orthologs.push({species: labelProp, source: dataSources});
      });
    }
  }

  mapTissueData(): void {
    this.data.expression.forEach(tissue => {
      const tissueTerm: Property = new Property(tissue);
      const tissueArr: Property[] = this.tissueData.get(tissueTerm.label);
      if (tissueArr) {
        tissueArr.push(tissueTerm);
        this.tissueData.set(tissueTerm.label, tissueArr);
      } else {
        this.tissueData.set(tissueTerm.label, [tissueTerm]);
      }
    });
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

  getData(field: string): Property[] {
    return this.tissueData.get(field);
  }

  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  changeHarminogramTabData(event: MatTabChangeEvent) {
    this.hgData = this.tissueData.get(this.sources[event.index].label);
    this.imgUrl = this._URL + this.sources[event.index].name;

    // this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }
}
