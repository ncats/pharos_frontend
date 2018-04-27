import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../../models/table-data';

@Component({
  selector: 'pharos-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any[];
  @Input() fieldsMap: TableData[];
  loading = false;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fieldColumns: string[];
  displayColumns: string[];

  constructor() { }

  // todo need to parse differnt data types - ortholog returns an array of external links
  ngOnInit() {
    this.fetchTableFields();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // todo : material version 6.0 supports lazy loading of tabs- so this will no longer be necessary
  ngOnChanges(change: SimpleChange) {
    if (!change.firstChange) {
      this.dataSource.data = this.data;
    }
  }

  getLabel(name: string): string {
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
    this.fieldColumns = this.fieldsMap.map(field => {
      return field.name;
    });
    this.displayColumns = this.fieldColumns;
  }

}
