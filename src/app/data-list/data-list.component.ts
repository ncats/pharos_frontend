import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ResponseParserService} from "../services/response-parser.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";
import {LoadingService} from "../services/loading.service";
import {EnvironmentVariablesService} from "../services/environment-variables.service";

const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'pharos-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

export class DataListComponent implements OnInit, OnDestroy {
  data: any;
  loading = false;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fieldsMap: any[];
  displayColumns: string[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private environmentVariablesService: EnvironmentVariablesService,
              private responseParserService: ResponseParserService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.fetchTableFields();

    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.loading = res
      });

    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res=> {
      this.dataSource.data = res;
      this.ref.markForCheck(); //refresh the component manually
        this.loadingService.toggleVisible(false);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLabel(name: string): string {
    let ret: string = "";
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

  fetchTableFields(): void {
    this.fieldsMap = this.environmentVariablesService.getTableFields(this._route.snapshot.url[0].path);
    this.displayColumns = this.fieldsMap.map(field => field.name);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

paginationChanges(event: any ) {
  navigationExtras.queryParams = { top: event.pageSize, skip: event.pageIndex * event.pageSize };
  this._nagivate(navigationExtras);
}

// todo remove ordering on default switch
sortTable(event: any): void {
    let sort: string = "";
  switch (event.direction){
    case 'asc': {
      sort = '^' + event.active;
      break;
    }
    case 'desc': {
      sort = '$' + event.active;
      break;
    }
    default: {
      sort = null;
      break;
    }
  }

  if(sort === null){
    navigationExtras.queryParams = { };
  }else{
    navigationExtras.queryParams = {order: sort};
  }
  this._nagivate(navigationExtras);
}

private _nagivate(navigationExtras: NavigationExtras): void {
  this.router.navigate([], navigationExtras);

}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
