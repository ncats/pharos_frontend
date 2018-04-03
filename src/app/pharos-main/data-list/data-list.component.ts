import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, Renderer2, Type,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {combineLatest, takeUntil} from 'rxjs/operators';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {SelectionModel} from '@angular/cdk/collections';
import {TargetTableComponent} from "./target-table/target-table.component";
import {CustomContentDirective} from "./custom-content.directive";


const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'pharos-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

export class DataListComponent implements OnInit, OnDestroy, AfterViewInit {
  data: any;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  fieldsMap: any[];
  fieldColumns: string[];
  displayColumns: string[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2,
              private componentFactoryResolver: ComponentFactoryResolver,
              private pathResolverService: PathResolverService,
              private environmentVariablesService: EnvironmentVariablesService,
              private responseParserService: ResponseParserService,
              private loadingService: LoadingService) {
  }

  // todo: this is changed each pagination change, so something needs to persist the selected rows

  ngOnInit() {
    const path = this._route.snapshot.data.path;

    console.log(this);
// todo: convert to combine latest
    this.pathResolverService.path$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.fetchTableFields(res));


    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.loading = res;
      });

    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.data = res;
        this.loadComponent();
       // this.ref.markForCheck(); // refresh the component manually
        this.loadingService.toggleVisible(false);
      });

/*    this.rowSelection.onChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        console.log(this.rowSelection.selected);
      });*/
  }

  ngAfterViewInit() {
//    this.dataSource.paginator = this.paginator;
//    this.dataSource.sort = this.sort;
  }
/*
  getLabel(name: string): string {
    let ret = '';
    this.fieldsMap.forEach(field => {
      if (field.name === name) {
        ret = field.label;
      }
    });
    return ret;
  }

  isSortable(name: string): boolean {
    let ret = false;
    this.fieldsMap.forEach(field => {
      if (field.name === name) {
        ret = field.sortable;
      }
    });
    return ret;
  }*/

/*  isSelected(row: any): boolean {
    return this.rowSelection.selected.includes(row);
  }*/

  fetchTableFields(path: string): void {
    this.fieldsMap = this.environmentVariablesService.getTableFields(path);
    this.fieldColumns = this.fieldsMap.map(field => field.name);
    // this.displayColumns = ['list-select'].concat(this.fieldColumns);
    this.displayColumns = this.fieldColumns;
  }

  paginationChanges(event: any) {
    navigationExtras.queryParams = {top: event.pageSize, skip: event.pageIndex * event.pageSize};
    this._navigate(navigationExtras);
  }

// todo remove ordering on default switch
  sortTable(event: any): void {
    let sort = '';
    switch (event.direction) {
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

    if (sort === null) {
      navigationExtras.queryParams = {};
    } else {
      navigationExtras.queryParams = {order: sort};
    }
    this._navigate(navigationExtras);
  }

  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  loadComponent() {

/*    this.fieldsMap.forEach(field => {
      if (field.name === name) {
        ret = !!field.component;
      }
    });*/

    const instance: Type<any> = TargetTableComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(instance);
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.data;
    componentRef.instance.displayColumns = this.fieldColumns;
    componentRef.instance.sortChange.subscribe((event)=>{
      console.log(event);
      this.sortTable(event);
    })
  }
}
