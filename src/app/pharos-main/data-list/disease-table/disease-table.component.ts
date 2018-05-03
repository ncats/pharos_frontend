import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material";
import {Disease} from "../../../models/disease";

@Component({
  selector: 'pharos-disease-table',
  templateUrl: './disease-table.component.html',
  styleUrls: ['./disease-table.component.css']
})
export class DiseaseTableComponent implements OnInit {
  displayColumns: string[] = ['id', 'name', 'description'];
  @Input() data: Disease[];
  @Input() total: number;

  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  dataSource = new MatTableDataSource<any>(this.data);
  rowSelection = new SelectionModel<any>(true, []);

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.data;
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }
}
