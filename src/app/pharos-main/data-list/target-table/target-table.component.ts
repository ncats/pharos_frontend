import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from '../../../models/target';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  @Input() data: Target[];
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
