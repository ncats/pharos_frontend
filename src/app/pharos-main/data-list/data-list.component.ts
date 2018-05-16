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
  path: string;
  total: number;
  results: Map<string, any[]> = new Map<string, any>();

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private responseParserService: ResponseParserService,
              private loadingService: LoadingService,
              private componentLookup: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService) {
    this.path = this._route.snapshot.data.path;
  }


  // todo may need to convert this to use the same pattern as target details component - get a list of components
  // todo: (targets, diseases, etc) and call each api. This turns search into multiple separate calls/components, and leaves
  // todo: pagins/filtering as single components

  ngOnInit() {
    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.loading = res);

    /*    token.components.forEach(component => {
          // start api calls before making component
          const keys: string[] = [];
          component.api.forEach(apiCall => {
            if (apiCall.url.length > 0) {
              /!**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*!/
              this.dataDetailsResolver.getDetailsByUrl(apiCall.url.replace('_id_', this.target.id), apiCall.field);
              /!** this will be used to track the object fields to get *!/
              keys.push(apiCall.field);
            }
          });
          /!** make component *!/
          const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
          const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
          if (component.width) {
            childComponent.instance.width = component.width;
          }

          this._data
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(obj => {
              childComponent.instance.data = this.pick(obj, keys);
            });
        });
        */


    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.log(res);
        this.results.clear();
        this.componentHost.viewContainerRef.clear();
        this.filterData(res);
        Array.from(this.results.keys()).forEach(dataType => {
          console.log(this.path);
          //this.path = dataType.toLowerCase().split('.models.')[1] + 's';
          //this.path = 'targets';
          const components: any = this.componentLookup.lookupByPath(this.path, 'list');
          if (components) {
            components.forEach(component => {
              if(component.token) {
                const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
                const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
                console.log(this.results);
                childComponent.instance.data = this.results.get(dataType);
                this.responseParserService.paginationData$
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(response => {
                    childComponent.instance.total = response['total'] ? response['total'] : this.results.get(dataType).length;
                  });
                if (childComponent.instance.sortChange) {
                  childComponent.instance.sortChange.subscribe((event) => {
                    this.sortTable(event);
                    // todo sort arrows are not staying after column select
                  });
                }
                if (childComponent.instance.pageChange) {
                  childComponent.instance.pageChange.subscribe((event) => {
                    this.paginationChanges(event);
                  });
                }
                childComponent.instance.data = this.results.get(dataType);
              }
          });
          }
        })
        this.loadingService.toggleVisible(false);
      })
  }





         /* const dynamicToken = this.componentInjectorService.getComponentToken(token[0]);
          const dynamicComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicToken);
          dynamicComponent.instance.data = this.results.get(dataType);
          this.responseParserService.paginationData$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              dynamicComponent.instance.total = response['total'] ? response['total'] : this.results.get(dataType).length;
            });
          if (dynamicComponent.instance.sortChange) {
            dynamicComponent.instance.sortChange.subscribe((event) => {
              this.sortTable(event);
              // todo sort arrows are not staying after column select
            });
          }
          if (dynamicComponent.instance.pageChange) {
            dynamicComponent.instance.pageChange.subscribe((event) => {
              this.paginationChanges(event);
              // todo sort arrows are not staying after column select
            });
          }
        }
        });
        this.loadingService.toggleVisible(false);
      });*/

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
        const kinds = this.results.get(this.path);
        if (kinds) {
          kinds.push(obj);
          this.results.set(this.path, kinds);
        } else {
          this.results.set(this.path, [obj]);
        }
      });
    }
  }

  paginationChanges(event: any) {
    console.log("page changes");
    navigationExtras.queryParams = {top: event.pageSize, skip: event.pageIndex * event.pageSize};
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
