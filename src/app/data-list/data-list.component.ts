import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import {ResponseParserService} from "../services/response-parser.service";
import {PharosApiService} from "../services/pharos-api.service";
import {detectChanges} from "@angular/core/src/render3";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'pharos-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, OnDestroy {
  data: any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayColumns: string[] = ['name', 'idgTDL','idgFamily', 'novelty','jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private responseParserService: ResponseParserService) {
  }

  ngOnInit() {
    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res=> {
      this.dataSource.data = res;
      this.ref.markForCheck(); //refresh the component manually
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

paginationChanges(event: any ) {
  console.log(event);
  const navigationExtras: NavigationExtras = {
    queryParams: { top: event.pageSize, skip: event.pageIndex * event.pageSize },
    queryParamsHandling: 'merge'
  };
  this.router.navigate([], navigationExtras);
}

sortTable(event: any): void {
    console.log(event);
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
