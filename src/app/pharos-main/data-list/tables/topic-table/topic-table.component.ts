import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PageData} from '../../../../models/page-data';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnDestroy  {
  // @Input() data: Topic[];
  topicsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  /**
   * event emitter of sort event on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * event emitter for page change on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;


  /**
   *  Paginator object from Angular Material
   */
  @ViewChild(MatPaginator) ligandPaginator: MatPaginator;


  /**
   * set up dependencies
   * @param {ChangeDetectorRef} changeDetector
   * @param {HttpClient} _http
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private _http: HttpClient) {
    super();
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    this._data.subscribe(d => {
      if (this.data) {
        this.topicsDataSource.data = this.data;
      }
    });
  }

  /**
   * ititialize paginator
   */
  ngAfterViewInit() {
    this.topicsDataSource.paginator = this.ligandPaginator;
    this.changeDetector.detectChanges();
  }
  /**
   * send table sort event to emitter, external component handles sorting
   * @param $event
   */
  changeSort($event): void {
    this.sortChange.emit($event);
  }

  /**
   * send table page event to emitter, external component handles paging
   * @param $event
   */
  changePage($event): void {
    this.pageChange.emit($event);
  }

  /**
   * cleanup on destroy
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

