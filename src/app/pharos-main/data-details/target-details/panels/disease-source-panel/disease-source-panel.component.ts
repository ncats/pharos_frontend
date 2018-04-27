import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DiseaseRelevance} from '../../../../../models/disease-relevance';
import {TableData} from '../../../../../models/table-data';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {forEach} from '@angular/router/src/utils/collection';
import {MatTabChangeEvent} from '@angular/material';

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
  )]
  ]
);

@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.css']
})
export class DiseaseSourceComponent implements OnInit {
  sourceMap: Map<string, DiseaseRelevance[]> = new Map<string, DiseaseRelevance[]>();
  fieldsMap: Map<string, TableData[]> = new Map<string, TableData[]>();
  sources: string[];
  @Input() width = 30;
  tableArr: any[] = [];

/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

  private _data = new BehaviorSubject<any>(null);

  @Input()
  set data(value: any) {
    if (value.diseaseSources) {
      this.sourceMap.clear();
      value.diseaseSources.forEach(dr => {
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
            tableData[td.name] = prop.getData();
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
          this.fieldsMap.set(labelProp, fields);
          this.sourceMap.set(labelProp, tempArr);
        }
    });
      this.sources = Array.from(this.sourceMap.keys());
    }
    this._data.next(value);
  }

  get data() {
    return this._data.getValue();
  }
  constructor() { }

  ngOnInit() {
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

