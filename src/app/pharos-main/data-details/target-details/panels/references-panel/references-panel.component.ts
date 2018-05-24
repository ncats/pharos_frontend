import {
  AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChange, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Publication} from '../../../../../models/publication';
import {BehaviorSubject} from 'rxjs';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent extends DynamicPanelComponent implements OnInit, AfterViewInit {
 // data: any;
  displayColumns: string[] = ['pmid', 'year', 'title'];
  dataSource = new MatTableDataSource<Publication[]>();
 /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**Sort object from Angular Material */
  @ViewChild(MatSort) sort: MatSort;

/*  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }*/

  width: number;

  constructor() {
    super();
  }

  ngOnInit() {
  //  this.data = {references: []};
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
       //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.data.references && this.data.references.length > 0) {
          this.dataSource.data = this.data.references;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
