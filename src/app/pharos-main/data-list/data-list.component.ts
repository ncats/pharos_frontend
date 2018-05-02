import {
  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatSort } from '@angular/material';
import {Subject} from 'rxjs/Subject';
import { takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {SelectionModel} from '@angular/cdk/collections';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';


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
  results: Map<string, any[]> = new Map<string, any>();

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private responseParserService: ResponseParserService,
              private loadingService: LoadingService,
              private componentLookup: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService) {
    this.path = this._route.snapshot.data.path;
  }

  ngOnInit() {
    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.loading = res;
      });



    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.log(res);
        this.data = res;
        console.log(this);
        this.filterData(res);
        const token: any = this.componentLookup.lookupByPath(this.path, 'list');
        console.log(token);
        if(token) {
          const dynamicComponentToken = this.componentInjectorService.getComponentToken(this.componentHost, token);
          const dynamicComponent: any = this.componentInjectorService.injectComponent(this.componentHost, dynamicComponentToken);
          dynamicComponent.instance.data = res;
          if (dynamicComponent.instance.sortChange) {
            dynamicComponent.instance.sortChange.subscribe((event) => {
              this.sortTable(event);
              // todo sort arrows are not staying after column select
            });
          }
          this.ref.markForCheck(); // refresh the component manually
        }
        this.loadingService.toggleVisible(false);
      });

    // todo: this is changed each pagination change, so something needs to persist the selected rows
    /*    this.rowSelection.onChange
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(change => {
            console.log(this.rowSelection.selected);
          });*/
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

  filterData(res):void {
    this.results.clear();
    if(res) {
      res.map(obj => {
        const kinds = this.results.get(obj.kind);
        if (kinds) {
          kinds.push(obj);
          this.results.set(obj.kind, kinds);
        } else {
          this.results.set(obj.kind, [obj]);
        }
      })
    }
  }

  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
