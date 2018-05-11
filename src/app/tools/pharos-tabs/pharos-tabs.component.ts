import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {MatTabChangeEvent} from '@angular/material';
import {TableData} from '../../models/table-data';
import {DiseaseRelevance} from '../../models/disease-relevance';
import {BehaviorSubject} from 'rxjs/index';

@Component({
  selector: 'pharos-tabs',
  templateUrl: './pharos-tabs.component.html',
  styleUrls: ['./pharos-tabs.component.css']
})
export class PharosTabsComponent extends DynamicPanelComponent implements OnInit {
  sourceMap: Map<string, DiseaseRelevance[]> = new Map<string, DiseaseRelevance[]>();
  fieldsMap: Map<string, TableData[]> = new Map<string, TableData[]>();
  sources: string[];
  tableArr: any[] = [];

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
      .subscribe(x => {
        this.setterFunction();
      });
  }


  setterFunction() {
    console.log(this.data);
    /*if (this.data.diseaseSources) {
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
    this._data.next(value);*/
  }

  changeTabData(event: MatTabChangeEvent) {
    this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }

  getSourceCount(source: string): number {
    return this.sourceMap.get(source).length;
  }

}
