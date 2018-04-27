import {
  AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../../models/table-data';

/**
 * Generic table Component that iterates over a list of {@link TableData} options to display fields
 * todo add better link display parsing
 */
@Component({
  selector: 'pharos-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit, OnChanges, AfterViewInit {
  /** Data passed in from another component. Displayed fields come from the fieldsConfig object*/
  @Input() data: any[];
  /**Array of {@link TableData} object that containg configuration options for each field */
  @Input() fieldsConfig: TableData[];
  /** boolean to toggle completion of page loading
   * todo: currently not used
   * */
  loading = false;
  /** Angular Material datasource collection for a table*/
  dataSource = new MatTableDataSource<any>([]);
  /**Paginator object from Angular Material */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**Sort object from Angular Material */
  @ViewChild(MatSort) sort: MatSort;
  /**generated string array of fields that are to be displayed in the table */
  displayColumns: string[];

  /** No dependencies*/
  constructor() { }

  /**
   * Init: first get the columns to be displayed, then set the table data
   */
  ngOnInit() {
    this.fetchTableFields();
    this.dataSource.data = this.data;
  }

  /**
   * set the sort and paginators
   * todo: sort doesn't appear to work
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  /**
   * when the input changes, manually change the dataSource data.
   * This is used when multiple tables are contained inside tabs
   * todo : material version 6.0 supports lazy loading of tabs- so this will no longer be necessary
   * @param {SimpleChanges} change
   */
  ngOnChanges(change: SimpleChanges) {
    if (!change.firstChange) {
      this.dataSource.data = this.data;
    }
  }

  /**
   * Returns readable label for a data field
   * @param {string} name
   * @returns {string}
   */
  getLabel(name: string): string {
    let ret = '';
    this.fieldsConfig.forEach(field => {
      if (field.name === name) {
        ret = field.label;
      }
    });
    return ret;
  }

  /**
   * Check to see if a column is designed to be sortable
   * @param {string} name
   * @returns {boolean}
   */
  isSortable(name: string): boolean {
    let ret =  false;
    this.fieldsConfig.forEach(field => {
      if (field.name === name) {
        ret = field.sortable;
      }
    });
    return ret;
  }

  /**
   *sets a flat array of the {@link TableData} fields
   * @returns void
   */
  fetchTableFields(): void {
    if (this.fieldsConfig) {
      this.displayColumns = this.fieldsConfig.map(field => {
        return field.name;
      });
    }
  }
}
