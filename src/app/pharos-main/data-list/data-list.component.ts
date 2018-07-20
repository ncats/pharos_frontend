import {
  ChangeDetectorRef, Component, OnDestroy, OnInit, Type, ViewChild
} from '@angular/core';
import {MatPaginator, MatSort } from '@angular/material';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {SelectionModel} from '@angular/cdk/collections';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {takeUntil} from 'rxjs/operators';
import {DataListResolver} from '../services/data-list.resolver';
import {PageData} from '../../models/page-data';

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
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
  kind: string;
  total: number;
  results: Map<string, any[]> = new Map<string, any>();

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private responseParserService: ResponseParserService,
              private dataListResolver: DataListResolver,
              private loadingService: LoadingService,
              private componentLookup: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService) {}


  // todo may need to convert this to use the same pattern as target details component - get a list of components
  // todo: (targets, diseases, etc) and call each api. This turns search into multiple separate calls/components, and leaves
  // todo: pagins/filtering as single components

  ngOnInit() {
    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.loading = res);


    /**
     * THIS COMPONENT ISN'T DYNAMICALLY INJECTED, SO NO APIS ARE CALLED
     * this is triggered by list data change from above
     * empties current data and clears view (this may need to be re-evaluated
     * data is mapped by type -- this is mainly for search, but could be anywhere
     * for each data type, the list type is retrieved
     * that component is injected
     * the data map is set to the component instance
     * one each data change the process is repeated, including the api calls
      */
    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.componentHost.viewContainerRef.clear();
        res.content.forEach(dataList => {
              const components: any = this.componentLookup.lookupByPath(dataList.kind, 'list');
              if (components) {
                components.forEach(component => {
                  if (component.token) {
                    const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
                    const dynamicComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
                      dynamicComponent.instance.pageData = new PageData(dataList.data);
                    if (dynamicComponent.instance.sortChange) {
                      dynamicComponent.instance.sortChange.subscribe((event) => {
                        this.sortTable(event);
                        // todo sort arrows are not staying after column select
                      });
                    }
                    if (dynamicComponent.instance.pageChange) {
                      dynamicComponent.instance.pageChange.subscribe((event) => {
                        this.paginationChanges(event);
                      });
                    }
                    dynamicComponent.instance.data = dataList.data.content;
                  }
                });
              }
          });

          this.loadingService.toggleVisible(false);
      });
  }
    // todo: this is changed each pagination change, so something needs to persist the selected rows
    /*    this.rowSelection.onChange
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(change => {
            console.log(this.rowSelection.selected);
          });*/
 // }

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

  filterData(res): void {
    // todo decide on using object type or url path
    // needs to be done by obj.kind for search results
    this.results.clear();
    if (res) {
      res.map(obj => {
        const kinds = this.results.get(obj.kind);
        if (kinds) {
          kinds.push(obj);
          this.results.set(obj.kind, kinds);
        } else {
          this.results.set(obj.kind, [obj]);
        }
      });
    }
  }

  paginationChanges(event: any) {
      navigationExtras.queryParams = {
        page: event.pageIndex + 1,
        // top: event.pageSize,
       // skip: event.pageIndex * event.pageSize,
      };
      if (event.pageSize !== 10) {
        navigationExtras.queryParams.rows = event.pageSize;
      }
   // navigationExtras.queryParams = {top: event.pageSize, skip: event.pageIndex * event.pageSize};
    this._navigate(navigationExtras);
  }

  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  /**
   * clears data
   * empties component
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.results.clear();
    this.componentHost.viewContainerRef.clear();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
