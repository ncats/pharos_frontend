import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {DynamicTablePanelComponent} from "../../../../tools/dynamic-table-panel/dynamic-table-panel.component";

/**
 * display a pageable/ sortable list of disease objects
 * extends dynamic panel to utilize data getters and setters
 */
@Component({
  selector: 'pharos-disease-table',
  templateUrl: './disease-table.component.html',
  styleUrls: ['./disease-table.component.css']
})
export class DiseaseTableComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  /**
   * object fields for the table to show
   * @type {string[]}
   */
  displayColumns: string[] = ['id', 'name', 'description'];

  /**
   * total count of results
   * todo: not always accurate
   */
  @Input() total: number;

  /**
   * event emitter for when a table column sort is changed
   * @type {EventEmitter<string>}
   */
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();  /**

   * event emitter for when table pagination is changed
   * @type {EventEmitter<string>}
   */

  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * material design datasource subject
   * @type {MatTableDataSource<any>}
   */

  dataSource = new MatTableDataSource<any>(this.data);
  /**
   * material design selection model for when the table becomes selectable
   * todo: add selectable row functionolity
   * @type {SelectionModel<any>}
   */
  rowSelection = new SelectionModel<any>(true, []);

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;


  /**
   * no required services
   */
  constructor() {
    super();
  }

  /**
   * subscribe to data observable, since the data changes on paging/filtering, only unsibscribe on destroy
   */
  ngOnInit() {

    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
       takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.dataSource.data = this.data;
      });
  }

  /**
   * material design sorting change
   * emits to parent class {DataListComponent} to handle sorting
   * @param $event
   */
  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    this.pageChange.emit($event);
  }

  /**
   * unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
