import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from "../../../models/target";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {
  @Input() displayFields: string[];
  // @Input() data: Target[];
  @Input() data: any[];
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();

  dataSource = new MatTableDataSource<any>(this.data);
  rowSelection = new SelectionModel<any>(true, []);

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.data;
    console.log(this);
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }
}
