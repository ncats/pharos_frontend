import {ChangeDetectorRef, Component, Input, OnInit, SimpleChange} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Publication} from "../../../../../models/publication";

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent implements OnInit {
  data: Publication[];
  displayColumns: string[] = ['pmid','year','title'];
  dataSource = new MatTableDataSource<any>(this.data);
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this);
  //  this.dataSource.data = this.data;
  }

  ngOnChanges(change: SimpleChange): void {
    console.log(change);
    if(change['data'] && !change['data'].firstChange){
      this.dataSource.data = change['data'].currentValue;
    }
  }

  update(): void {
    console.log("updating");
    this.ref.markForCheck();
  }
}
