import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../models/page-data';
import {BatchUploadModalComponent} from '../../../tools/batch-upload-modal/batch-upload-modal.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.scss']
})

export class TargetTableComponent  extends DynamicPanelComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  // displayColumns: string[] = ['list-select', 'name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
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

  isSmallScreen = false;

  dataSource = new MatTableDataSource<any>([]);
  rowSelection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog,
              public http: HttpClient,
              public breakpointObserver: BreakpointObserver
              ) {
    super();
  }

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

  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    this.pageChange.emit($event);
  }

  batchUpload() {
    const dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '50vh',
        width: '66vw',
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'text/plain',
        })
      };
      this.http.post(`https://pharos.ncats.io/app/api/v1/batchResolve`, result, httpOptions).subscribe(res => {
        console.log(res);
      });
    });
  }

  compareTargets() {
    console.log(this.rowSelection.selected);
  }

  createTopic() {
    console.log(this.rowSelection.selected);
  }

  saveTargets() {
    console.log(this.rowSelection.selected);
  }

ngOnDestroy(): void {
  this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
}
}
