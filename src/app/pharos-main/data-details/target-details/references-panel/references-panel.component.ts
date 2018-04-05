import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Publication} from "../../../../models/publication";

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent implements OnInit {
  displayColumns: string[] = ['pmid','year','title'];
  dataSource = new MatTableDataSource<any>();
  data: Publication[];
  constructor() { }

  ngOnInit() {
  }

}
