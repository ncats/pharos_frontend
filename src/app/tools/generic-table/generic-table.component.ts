import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../../models/table-data';

@Component({
  selector: 'pharos-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {
  @Input() data: any[];
  @Input() fieldsMap: TableData[];
  loading = false;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fieldColumns: string[];
  displayColumns: string[];

  constructor() { }

  ngOnInit() {

    console.log(this);
  }

  ngOnChanges(change) {
    console.log(change);
    this.fetchTableFields();
    this.dataSource.data = this.data;
  }

  getLabel(name: string): string {
    console.log(name);
    let ret = '';
    this.fieldsMap.forEach(field => {
      if (field.name === name) {
        ret = field.label;
      }
    });
    return ret;
  }

  isSortable(name: string): boolean {
    let ret =  false;
    this.fieldsMap.forEach(field => {
      if (field.name === name) {
        ret = field.sortable;
      }
    });
    return ret;
  }

  fetchTableFields(path?: string): void {
    console.log("fetcihing");
    this.fieldColumns = this.fieldsMap.map(field => field.name);
    // this.displayColumns = ['list-select'].concat(this.fieldColumns);
    this.displayColumns = this.fieldColumns;
  }

}
