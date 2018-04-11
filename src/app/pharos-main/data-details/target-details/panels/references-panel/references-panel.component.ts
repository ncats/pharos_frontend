import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Publication} from "../../../../../models/publication";

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent implements OnInit {
  @Input() data: Publication[];
  displayColumns: string[] = ['pmid','year','title'];
  dataSource = new MatTableDataSource<any>(this.data);
  constructor() { }

  ngOnInit() {
    console.log(this);
  }

  ngOnChanges(change: SimpleChange): void {
    if(change['data'] && !change['data'].firstChange){
      this.dataSource.data = change['data'].currentValue;
    }
  }

}
