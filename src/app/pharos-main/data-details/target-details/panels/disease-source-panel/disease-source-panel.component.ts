import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {DiseaseRelevance} from "../../../../../models/disease-relevance";
import {TableData} from "../../../../../models/table-data";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {forEach} from "@angular/router/src/utils/collection";
import {MatTabChangeEvent} from "@angular/material";

@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.css']
})
export class DiseaseSourceComponent implements OnInit {
  sourceMap : Map<string, DiseaseRelevance[]> = new Map<string, DiseaseRelevance[]>();
  sources: string[];
  @Input() width: number = 30;
  tableArr: any[] = []
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

  // change data to use getter and setter
  @Input()
  set diseaseSources(value: DiseaseRelevance[]) {
    if (value) {
      this.sourceMap.clear();
      const temp: DiseaseRelevance[] = [];
      value.forEach(dr => {
        //create new disease relevance object to get Property class properties
        const readDR = new DiseaseRelevance(dr);
        // get source label
        let labelProp: string = readDR.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term'])[0];
        // get array of diseases from source map
        const tableData: any = {};
        readDR.properties.forEach(prop => {
          const td = TABLEMAP.get(prop.label);
          if (td) {
            tableData[td.name] = prop.getData();
          }
        });

        const temp: DiseaseRelevance[] = this.sourceMap.get(labelProp);
        if (temp) {
          temp.push(tableData);
          this.sourceMap.set(labelProp, temp);
        } else {
          const tempArr: any[] = [];
        tempArr.push(tableData);
          this.sourceMap.set(labelProp, tempArr);
        }
    });
      this.sources = Array.from(this.sourceMap.keys());
    }
  }
   /* this.diseaseSources.forEach(rel => {
      let labelProp: string = rel.properties.filter(prop => prop.label ==='Data Source').map(lab => lab['term'])[0];
      const temp: DiseaseRelevance[] = this.sourceMap.get(labelProp);
      if (temp) {
        temp.push(rel);
        this.sourceMap.set(labelProp, temp);
      } else {
        this.sourceMap.set(labelProp, [rel]);
      }
    })
    this.sources = Array.from(this.sourceMap.keys());
*/

  constructor() { }

  ngOnInit() {
    console.log(this);

    /*  this._data
      // listen to data as long as term is undefined or null
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(x => x);*/
  }

  mapSources(): void {
    // todo - clear map because the api is returning or getting set twice
    this.sourceMap.clear();
    this.diseaseSources.forEach(rel => {
      let labelProp: string = rel.properties.filter(prop => prop.label ==='Data Source').map(lab => lab['term'])[0];
      const temp: DiseaseRelevance[] = this.sourceMap.get(labelProp);
      if (temp) {
        temp.push(rel);
        this.sourceMap.set(labelProp, temp);
      } else {
        this.sourceMap.set(labelProp, [rel]);
      }
    })
    //this.sources = ['DisGeNET', 'DrugCentral Indication', 'Expression Atlas', 'JensenLab Experiment COSMIC', 'JensenLab Text Mining', 'Monarch', 'UniProt Disease']
  }

  changeTabData(event: MatTabChangeEvent) {
    console.log()
    //this.sourceMap.get(this.sources[event.index]).forEach(dr =>)
    this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }

  getSourceCount(source: string): number {
    return this.sourceMap.get(source).length;
  }

  getTableData(field: string): TableData[] {
    const data: TableData[] = [];
    const diseaseRelevance: DiseaseRelevance[] = this.sourceMap.get(field);
    if(diseaseRelevance.length > 0) {
      console.log(diseaseRelevance);
      const dr: DiseaseRelevance = diseaseRelevance[0];
      dr.properties.forEach(prop => {
        const td = TABLEMAP.get(prop.label);
        if(td) {
          data.push(td);
        }
      })
    }
    return data;
  }
}

// skipping log2foldchange property
const TABLEMAP: Map<string, TableData> = new Map<string, TableData>(
  [
    ['IDG Disease',  new TableData({
    name: 'disease',
    label: 'Disease',
    sortable: true,
    internalLink: true
  })
  ],[
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

  )],['pvalue', new TableData({
    name: 'pvalue',
    label: 'P-value',
      sortable: true
    }
  )]
  ]
)
