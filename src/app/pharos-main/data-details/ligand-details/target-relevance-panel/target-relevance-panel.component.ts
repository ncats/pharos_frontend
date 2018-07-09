import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {TableData} from "../../../../models/table-data";

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
      internalLink: true
    }),
    new TableData( {
      name: 'developmentLevel',
      label: 'IDG Development Level',
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
      externalLink: true
    }),
    new TableData( {
      name: 'developmentLevelValue',
      label: 'Development Level Value',
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
        console.log(this);
        if(this.data.targetRelevance && this.data.targetRelevance.length > 0) {
          this.tableArr = [];
          this.data.targetRelevance.forEach(target => {
            const data = {
              target: target.properties.filter(prop => prop.label ==='IDG Target')[0].term,
              developmentLevel: target.properties.filter(prop => prop.label ==='IDG Development Level')[0].term,
              targetFamily: target.properties.filter(prop => prop.label ==='IDG Target Family')[0].term,
              activity: target.properties.filter(prop => prop.label ==='Ligand Activity')[0].term,
            };
            data['developmentLevelValue'] = target.properties.filter(prop => prop.label === data.activity)[0].numval;
            this.tableArr.push(data);
          })
        }
      });

  }
}
