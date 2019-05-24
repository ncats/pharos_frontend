import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';

import {PharosProperty} from '../../../../models/pharos-property';

@Component({
  selector: 'pharos-target-list-panel',
  templateUrl: './target-list-panel.component.html',
  styleUrls: ['./target-list-panel.component.css']
})
export class TargetListPanelComponent extends DynamicPanelComponent implements OnInit {
  fields: PharosProperty[] = [
    new PharosProperty( {
      name: 'target',
      label: 'IDG Target'
    }),
    new PharosProperty( {
      name: 'developmentLevel',
      label: 'IDG Development Level'
    }),
    new PharosProperty({
      name: 'targetFamily',
      label: 'Target Family'
    }),
    new PharosProperty({
      name: 'dataSource',
      label: 'Data Source'
    }),
  ];

  tableArr: any[] = [];

  /**
   * no args constructor
   * calls spuer object constructor
   */
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
        if (this.data.targets && this.data.targets.length > 0) {
          this.tableArr = [];
          this.data.targets.forEach(target => {
            console.log(target);
            const data = {
             target: new PharosProperty({
                name: 'target',
                label: 'Target',
                term: target.name,
                sortable: true,
                internalLink: true
              }),
            //  target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
              developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
              targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
              dataSource: new PharosProperty(target.properties.filter(prop => prop.label === 'Data Source')[0]),
            };
            this.tableArr.push(data);
          });
        }
      });

  }
}

