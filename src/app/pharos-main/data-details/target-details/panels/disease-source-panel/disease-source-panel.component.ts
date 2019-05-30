import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DiseaseRelevance, DiseaseRelevanceSerializer} from '../../../../../models/disease-relevance';
import {MatTabChangeEvent, MatTreeNestedDataSource} from '@angular/material';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {NestedTreeControl} from "@angular/cdk/tree";


interface DiseaseTreeNode {
  name: string | PharosProperty;
  children?: DiseaseTreeNode[];
}

// skipping log2foldchange property
/**
 * map of pharos properties for displaying diseases
 * @type {Map<string, PharosProperty>}
 */
const TABLEMAP: Map<string, PharosProperty> = new Map<string, PharosProperty>(
  [
    ['IDG Disease',  new PharosProperty({
      name: 'disease',
      label: 'Disease',
      sortable: true
    })
    ], [
    'IDG Evidence', new PharosProperty( {
      name: 'evidence',
      label: 'Evidence'
    })
  ], [
    'IDG Z-score', new PharosProperty({
      name: 'zscore',
      label: 'Z-score',
      sortable: true
    })
  ], ['IDG Confidence', new PharosProperty({
      name: 'confidence',
      label: 'Confidence',
      sortable: true
    }

  )], ['pvalue', new PharosProperty({
      name: 'pvalue',
      label: 'P-value',
      sortable: true,
      sorted: 'desc'
    }
  )], ['log2foldchange', new PharosProperty({
      name: 'log2foldchange',
      label: 'log2 FC',
      sortable: true
    }
  )]
  ]
);

/**
 * component to display disease source data
 */
@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiseaseSourceComponent extends DynamicPanelComponent implements OnInit {
  sourceMap: Map<string, DiseaseRelevance[]> = new Map<string, DiseaseRelevance[]>();
  fieldsMap: Map<string, PharosProperty[]> = new Map<string, PharosProperty[]>();
  diseaseRelevanceSerializer: DiseaseRelevanceSerializer = new DiseaseRelevanceSerializer();
  diseaseSourcesArray: string[] = [];
  fieldsData: PharosProperty[] = [];
  tinx: PharosPoint[];
  loaded = false;
  @Input() diseaseSources?: any;
  tableArr: any[] = [];
  chartOptions: ScatterOptions;

  newdiseasemap: Map<string, any> = new Map<string, any>();
  treeControl: NestedTreeControl<DiseaseTreeNode> = new NestedTreeControl<DiseaseTreeNode>(node => node.children);
  dataSource: MatTreeNestedDataSource<DiseaseTreeNode> = new MatTreeNestedDataSource<DiseaseTreeNode>();
  treeData: any[] = [];

  constructor(
    private navSectionsService: NavSectionsService,
    private ref: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    console.log(this);
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

  setterFunction(): void {
    this.data.diseases.forEach(disease => {
     // console.log(disease);
      const dobj:PharosProperty = new PharosProperty(disease.properties.filter(prop => prop.label === 'IDG Disease')[0]);
      dobj.internalLink = ['/diseases', dobj.term as string];
      const dname: string = dobj.term as string;
      //console.log(dname);
      const dlist = this.newdiseasemap.get(dname);
      const diseaseSource = {
        name: new PharosProperty(disease.properties.filter(prop => prop.label === 'Data Source')[0]),
        children: [
          ...disease.properties
            .filter(prop => prop.label !== 'Data Source' && prop.label !== 'IDG Disease' )
            .map(prop => new PharosProperty(prop))
        ]
      }
      if(dlist) {
        dlist.sources.push(diseaseSource);
        this.newdiseasemap.set(dname, dlist);
      } else {
        this.newdiseasemap.set(dname, {disease: dobj, sources: [diseaseSource]});
      }
    });
    const sortedDiseases = Array.from(this.newdiseasemap.entries()).sort((a,b) => {
      if (a[1].sources.length < b[1].sources.length) {
        return 1;
      }
      if (a[1].sources.length > b[1].sources.length) {
        return -1;
      }
      return 0;
    });
    console.log(sortedDiseases);
    this.treeData = Array.from(new Map(sortedDiseases).values());
   /* console.log(map2);
    this.treeData = sortedDiseases.map(disease => {
      return {disease:disease[0], sources: disease[1]}
    });*/
    console.log(this.treeData);
  //  sortedDiseases.forEach(disease => this.treeData.push({name: disease[0], children: disease[1]}) )
   // this.dataSource.data = this.treeData;



    if (this.data.diseaseSources && this.data.diseaseSources.length > 0) {
      // const sources = this.data.diseaseSources;
      this.sourceMap.clear();
      this.data.diseaseSources.forEach(dr => {
        // create new disease relevance object to get PharosProperty class properties
        const readDR = this.diseaseRelevanceSerializer.fromJson(dr);
        // get source label
        const labelProp: string = readDR.properties.filter(prop => prop.label === 'Data Source')
          .map(lab => lab['term'] as string)[0];
        // get array of diseases from source map
        const tableData: any = {};
        const fields: PharosProperty[] = [];
        readDR.properties.forEach(prop => {
          const td = TABLEMAP.get(prop.label);
          if (td) {
            tableData[td.name] = new PharosProperty(prop);
            fields.push(td);
          }
        });

        const temp: DiseaseRelevance[] = this.sourceMap.get(labelProp);
        if (temp) {
          temp.push(tableData);
          this.sourceMap.set(labelProp, temp);
        } else {
          const tempArr: DiseaseRelevance[] = [];
          tempArr.push(tableData);
          this.fieldsMap.set(labelProp, Array.from(new Set(fields)));
          this.sourceMap.set(labelProp, tempArr);
        }
      });
      this.diseaseSourcesArray = Array.from(this.sourceMap.keys()).sort((a, b) => +(b === 'DrugCentral Indication'));
      this.tableArr = this.sourceMap.get(this.diseaseSourcesArray[0]);
      this.fieldsData = this.fieldsMap.get(this.diseaseSourcesArray[0]);
      this.loaded = true;
    }

    if (this.data.tinx && this.data.tinx.importances) {
      this.tinx = [];
       this.data.tinx.importances.map(point => {
         if (point.dname) {
           const p: PharosPoint = new PharosPoint({
             label: point.doid,
             x: point.dnovelty,
             y: point.imp,
             name: point.dname
           });
           this.tinx.push(p);
         }
      });

       this.chartOptions = new ScatterOptions({
           line: false,
         xAxisScale: 'log',
         yAxisScale: 'log',
         xLabel: 'Novelty',
         yLabel: 'Importance',
          margin: {top: 20, right: 45, bottom: 25, left: 35}
       });
    }
  }

  changeTabData(event: MatTabChangeEvent) {
    this.tableArr = this.sourceMap.get(this.diseaseSourcesArray[event.index]);
    this.fieldsData = this.fieldsMap.get(this.diseaseSourcesArray[event.index]);
  }

  getSourceCount(source: string): number {
    return this.sourceMap.get(source).length;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  sort(event) {
  }

  paginate(event) {
  }

  getTooltip(label: string): string {
    return this.apiSources.filter(source => source.field === label)[0].description;
  }

  showNodeData(node: DiseaseTreeNode): string {
    if (node['label']) {
      return `${node['label']}: ${node['term']}`;
    } else if (node.name['term']) {
      return node.name['term'];
    } else {
      return node.name as string;
    }
  }

  hasChild = (_: number, node: DiseaseTreeNode) => !!node.children && node.children.length > 0;

}

