import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {TableData} from "../../../../models/table-data";
import {PharosProperty} from "../../../../models/pharos-property";

@Component({
  selector: 'pharos-target-list-panel',
  templateUrl: './target-list-panel.component.html',
  styleUrls: ['./target-list-panel.component.css']
})
export class TargetListPanelComponent extends DynamicPanelComponent implements OnInit {
  fields: TableData[] = [
    new TableData( {
      name: 'target',
      label: 'IDG Target',
      sortable: true,
      internalLink: true
    }),
    new TableData( {
      name: 'developmentLevel',
      label: 'IDG Development Level',
      sortable: true,
      externalLink: true
    }),
    new TableData({
      name: 'targetFamily',
      label: 'Target Family',
      sortable: true
    })
  ];

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
        if (this.data.targetList && this.data.targetList.length > 0) {
          this.tableArr = [];
          this.data.targetList.forEach(target => {
            const data = {
              target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
              developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
              targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
            };
            this.tableArr.push(data);
          });
        }
      });

  }
}

