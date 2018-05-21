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
      });
  }

  changeTabData(event: MatTabChangeEvent) {
    this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }

  getSourceCount(source: string): number {
    return this.sourceMap.get(source).length;
  }

}
