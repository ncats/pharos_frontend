import {Component, Input, OnInit} from '@angular/core';
import {TableData} from "../../../../../models/table-data";
import {MatTabChangeEvent} from "@angular/material";
import {Ortholog} from "../../../../../models/ortholog";

@Component({
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.css']
})
export class OrthologPanelComponent implements OnInit {
  fields : TableData[] = [
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
  @Input() width: number = 30;
  tableArr: any[] = [];
  /*  @HostBinding('attr.fxFlex')
    flex = this.width;*/

  @Input()
  set orthologs(value: Ortholog[]) {
    if (value) {
      this.tableArr = [];
      const temp: Ortholog[] = [];
      value.forEach(obj => {
        //create new object to get Property class properties
        const newObj: Ortholog = new Ortholog(obj);
        // get source label
        let labelProp: string = newObj.properties.filter(prop => prop.label === 'Ortholog Species').map(lab => lab['term'])[0];
        let dataSources: string[] = newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
        this.tableArr.push({species: labelProp, source: dataSources});
      });
      }
  }
  constructor() { }

  ngOnInit() {
    console.log(this);
  }
}
