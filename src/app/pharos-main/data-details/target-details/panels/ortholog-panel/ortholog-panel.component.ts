import {Component, Input, OnInit} from '@angular/core';
import {TableData} from '../../../../../models/table-data';
import {MatTabChangeEvent} from '@angular/material';
import {Ortholog} from '../../../../../models/ortholog';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.css']
})
export class OrthologPanelComponent extends DynamicPanelComponent implements OnInit {
  fields: TableData[] = [
    new TableData({
    name: 'species',
    label: 'Species',
    sortable: true
  }),
    new TableData( {
      name: 'source',
      label: 'Source',
      externalLink: true
    })
  ];
  species: string[];
  tableArr: any[] = [];

  /*  @HostBinding('attr.fxFlex')
    flex = this.width;*/

  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
       this.tableArr = this.data;
        // this.setterFunction();
      });
  }

  setterFunction(): void {
    if (this.data.orthologs) {
      console.log(this);
      this.tableArr = [];
      const temp: Ortholog[] = [];
      this.data.orthologs.forEach(obj => {
        // create new object to get Property class properties
        const newObj: Ortholog = new Ortholog(obj);
        // get source label
        const labelProp: string = newObj.properties.filter(prop => prop.label === 'Ortholog Species').map(lab => lab['term'])[0];
        const dataSources: string[] = newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
        this.tableArr.push({species: labelProp, source: dataSources});
      });
    }
  }
}
