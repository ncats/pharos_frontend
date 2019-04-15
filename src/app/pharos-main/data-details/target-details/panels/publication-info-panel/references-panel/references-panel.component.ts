import {
  AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChange, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Publication} from '../../../../../../models/publication';
import {BehaviorSubject} from 'rxjs';
import {DynamicPanelComponent} from '../../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil, takeWhile} from 'rxjs/operators';
import {PageData} from '../../../../../../models/page-data';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../../models/target';

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent implements OnInit {
  displayColumns: string[] = ['pmid', 'year', 'title'];
  dataSource: any = new MatTableDataSource<Publication[]>();
  referencePageData: PageData;
  @Input()
  target: Target;
  /**Sort object from Angular Material */
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: any;
  loading = true;
  allReferences: Publication[];
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.setterFunction();
   /* this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
           this.setterFunction();
        }
      });*/
  }

  setterFunction() {
    this.dataSource.data = this.data.references.filter(ref => !!ref);
    this.allReferences = this.data.references.filter(ref => !!ref);
    this.loading = false;
    this.referencePageData = new PageData(
      {
        top: 10,
        skip: 0,
        total: this.target._publications.count,
        count: 10
      }
    );
  }

paginateReferences($event) {
  this.loading = true;
    this.http.get<any>(`${this.target._publications.href}?top=${$event.pageSize}&skip=${($event.pageIndex) * $event.pageSize}`)
      .subscribe(res => {
        this.dataSource.data = res.filter(ref => !!ref);
        this.loading = false;
      });
  }


}
