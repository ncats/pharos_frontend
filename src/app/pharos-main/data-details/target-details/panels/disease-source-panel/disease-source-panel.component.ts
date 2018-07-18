import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {DiseaseRelevance} from '../../../../../models/disease-relevance';
import {TableData} from '../../../../../models/table-data';
import {MatTabChangeEvent} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosPoint} from '../../../../../tools/visualizations/line-chart/line-chart.component';
import {Property} from "../../../../../models/property";

// skipping log2foldchange property
const TABLEMAP: Map<string, TableData> = new Map<string, TableData>(
  [
    ['IDG Disease',  new TableData({
      name: 'disease',
      label: 'Disease',
      sortable: true,
      internalLink: true
    })
    ], [
    'IDG Evidence', new TableData( {
      name: 'evidence',
      label: 'Evidence'
    })
  ], [
    'IDG Z-score', new TableData({
      name: 'zscore',
      label: 'Z-score',
      sortable: true
    })
  ], ['IDG Confidence', new TableData({
      name: 'confidence',
      label: 'Confidence',
      sortable: true
    }

  )], ['pvalue', new TableData({
      name: 'pvalue',
      label: 'P-value',
      sortable: true
    }
  )], ['log2foldchange', new TableData({
      name: 'log2foldchange',
      label: 'log2 FC',
      sortable: true
    }
  )]
  ]
);

@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.css']
})
export class DiseaseSourceComponent extends DynamicPanelComponent implements OnInit {
  sourceMap: Map<string, DiseaseRelevance[]> = new Map<string, DiseaseRelevance[]>();
  fieldsMap: Map<string, TableData[]> = new Map<string, TableData[]>();
  sources: string[];
  tinx: PharosPoint[];
  loaded = false;
  @Input() width = 30;
  tableArr: any[] = [];

/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => this.setterFunction());
  }

  setterFunction(): void {
    if (this.data.diseaseSources && this.data.diseaseSources.length > 0) {
      const sources = this.data.diseaseSources;
      this.sourceMap.clear();
      sources.forEach(dr => {
        // create new disease relevance object to get Property class properties
        const readDR = new DiseaseRelevance(dr);
        // get source label
        const labelProp: string = readDR.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term'])[0];
        // get array of diseases from source map
        const tableData: any = {};
        const fields: TableData[] = [];
        readDR.properties.forEach(prop => {
          const td = TABLEMAP.get(prop.label);
          if (td) {
            tableData[td.name] = new Property(prop);
            fields.push(td);
          }
        });

        const temp: DiseaseRelevance[] = this.sourceMap.get(labelProp);
        if (temp) {
          temp.push(tableData);
          this.sourceMap.set(labelProp, temp);
        } else {
          const tempArr: any[] = [];
          tempArr.push(tableData);
          this.fieldsMap.set(labelProp, Array.from(new Set(fields)));
          this.sourceMap.set(labelProp, tempArr);
        }
      });
      this.sources = Array.from(this.sourceMap.keys());
      this.tableArr = this.sourceMap.get(this.sources[0]);
      console.log(this.tableArr);
      this.loaded = true;
    }

    if (this.data.tinx) {
      this.tinx = [];
       this.data.tinx.importances.map(point => {
        const p: PharosPoint = {
          label: point.doid,
          key: point.imp,
          value: point.dnovelty,
          name: point.dname
        };
       this.tinx.push(p);
      });
    }
  }

  changeTabData(event: MatTabChangeEvent) {
    this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }

  getSourceCount(source: string): number {
    return this.sourceMap.get(source).length;
  }

  getTableData(field: string): TableData[] {
    return this.fieldsMap.get(field);
  }
}

