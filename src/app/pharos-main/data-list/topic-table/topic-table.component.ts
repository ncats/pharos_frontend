import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {PageData} from "../../../models/page-data";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnDestroy  {
  // @Input() data: Topic[];
  topicsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) ligandPaginator: MatPaginator;

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    this._data.subscribe(d => {
      if (this.data) {
        this.topicsDataSource.data = this.data;
      }
    });
  }

  ngAfterViewInit() {
    this.topicsDataSource.paginator = this.ligandPaginator;
    this.changeDetector.detectChanges();
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    this.pageChange.emit($event);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

