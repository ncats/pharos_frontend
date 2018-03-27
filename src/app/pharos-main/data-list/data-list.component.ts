import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {combineLatest, takeUntil} from 'rxjs/operators';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {SelectionModel} from "@angular/cdk/collections";


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
  rowSelection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fieldsMap: any[];
  fieldColumns: string[];
  displayColumns: string[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService,
              private environmentVariablesService: EnvironmentVariablesService,
              private responseParserService: ResponseParserService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
// todo: convert to combine latest
    this.pathResolverService.path$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.fetchTableFields(res));


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

    this.rowSelection.onChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        console.log(change);
        console.log(this.rowSelection.selected);
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

  fetchTableFields(path: string): void {
    this.fieldsMap = this.environmentVariablesService.getTableFields(path);
    this.fieldColumns = this.fieldsMap.map(field => field.name);
    this.displayColumns = ['list-select'].concat(this.fieldColumns);
    console.log(this);
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
