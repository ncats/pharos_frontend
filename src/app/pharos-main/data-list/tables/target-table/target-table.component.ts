import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {BatchUploadModalComponent} from '../../../../tools/batch-upload-modal/batch-upload-modal.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NavigationExtras, Router} from "@angular/router";
import {PharosConfig} from "../../../../../config/pharos-config";


/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

/**
 * display targets in a filterable list view
 */
@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.scss']
})

export class TargetTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  /**
   * columns to display in table
   * @type {string[]}
   */
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  // displayColumns: string[] = ['list-select', 'name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];

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
   * boolean to show or hide the large "targets" label
   * @type {boolean}
   */
  @Input() showLabel = true;

  /**
   * checks for mobile view to toggle small card view
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * main table data source
   * @type {MatTableDataSource<any>}
   */
  dataSource = new MatTableDataSource<any>([]);

  /**
   * selection model for when rows are selectable in table, used for compare and storing targets
   * @type {SelectionModel<any>}
   */
  rowSelection = new SelectionModel<any>(true, []);

  /**
   * set up dependencies
   * @param {MatDialog} dialog
   * @param {HttpClient} http
   * @param {Router} router
   * @param {BreakpointObserver} breakpointObserver
   */
  constructor(public dialog: MatDialog,
              public http: HttpClient,
              private router: Router,
              private pharosConfig: PharosConfig,
              public breakpointObserver: BreakpointObserver) {
    super();
  }

  /**
   * check for mobile view,
   * subscribe to data changes
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.length) {
          this.dataSource.data = this.data;
        }
      });
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
   * create and open batch upload dialog,
   * fetch results on close and redirect to search by etag
   * //todo change to config parameters
   */
  batchUpload() {
    const dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '50vh',
        width: '66vw',
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
        })
      };
      this.http.post(`${this.pharosConfig.getApiPath()}targets/resolve`, result.join(), httpOptions).subscribe(res => {
        navigationExtras.queryParams = {
          q: `etag:${res['etag']}`
        };
        this._navigate(navigationExtras);
      });
    });
  }

  /**
   * navigate to search with etag after batch upload
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.loading = false;
    this.router.navigate([], navExtras);

  }

  /**
   * stub for target comparison
   * todo: implement
   */
  compareTargets() {
    console.log(this.rowSelection.selected);
  }

  /**
   * stub for topic creation
   * todo: implement
   */
  createTopic() {
    console.log(this.rowSelection.selected);
  }

  /**
   * stub for target list saving
   * todo: implement
   */
  saveTargets() {
    console.log(this.rowSelection.selected);
  }

  /**
   * clean up
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
