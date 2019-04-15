import {Component, Input, OnInit} from '@angular/core';
import {TableData} from '../../../../../models/table-data';
import {MatTabChangeEvent} from '@angular/material';
import {Ortholog, OrthologSerializer} from '../../../../../models/ortholog';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.css']
})
export class OrthologPanelComponent extends DynamicPanelComponent implements OnInit {
  orthologSerializer: OrthologSerializer = new OrthologSerializer();
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
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.tableArr = this.data;
          // this.setterFunction();
        }
      });
  }

  // todo: this needs to be examined if ortholog becomes a standalone panel
  setterFunction(): void {
    if (this.data.orthologs) {
      this.tableArr = [];
      const temp: Ortholog[] = [];
      this.data.orthologs.forEach(obj => {
        // create new object to get PharosProperty class properties
        const newObj: Ortholog = this.orthologSerializer.fromJson(obj);
        // get source label
        const labelProp: string = newObj.properties.filter(prop => prop.label === 'Ortholog Species').map(lab => lab['term'])[0];
        const dataSources: string[] = newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
        this.tableArr.push({species: labelProp, source: dataSources});
      });
    }
  }
}
