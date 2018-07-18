import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {TableData} from "../../../../models/table-data";
import {Property} from "../../../../models/property";

@Component({
  selector: 'pharos-target-relevance-panel',
  templateUrl: './target-relevance-panel.component.html',
  styleUrls: ['./target-relevance-panel.component.css']
})

export class TargetRelevancePanelComponent extends DynamicPanelComponent implements OnInit {
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
    }),
    new TableData( {
      name: 'activity',
      label: 'Ligand Activity',
      sortable: true,
      externalLink: true
    }),
    new TableData( {
      name: 'developmentLevelValue',
      label: 'Activity Value',
      sortable: true,
      externalLink: true
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
        if(this.data.targetRelevance && this.data.targetRelevance.length > 0) {
          this.tableArr = [];
          this.data.targetRelevance.forEach(target => {
            const data = {
              target: new Property(target.properties.filter(prop => prop.label ==='IDG Target')[0]),
              developmentLevel: new Property(target.properties.filter(prop => prop.label ==='IDG Development Level')[0]),
              targetFamily: new Property(target.properties.filter(prop => prop.label ==='IDG Target Family')[0]),
              activity: new Property(target.properties.filter(prop => prop.label ==='Ligand Activity')[0]),
            };
            data['developmentLevelValue'] = new Property(target.properties.filter(prop => prop.label === data.activity.term)[0]);
            this.tableArr.push(data);
          })
        }
      });

  }
}
