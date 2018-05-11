import {
  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

  ngOnInit() {
    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.loading = res);

    this.responseParserService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.results.clear();
        this.componentHost.viewContainerRef.clear();
        this.filterData(res);
        Array.from(this.results.keys()).forEach(dataType => {
            this.path = dataType.toLowerCase().split('.models.')[1] + 's';
        const token: any = this.componentLookup.lookupByPath(this.path, 'list');
        if (token) {
          const dynamicToken = this.componentInjectorService.getComponentToken(token);
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
        }
          this.loadingService.toggleVisible(false);
        });
        this.loadingService.toggleVisible(false);
      });

    // todo: this is changed each pagination change, so something needs to persist the selected rows
    /*    this.rowSelection.onChange
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(change => {
            console.log(this.rowSelection.selected);
          });*/
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

  filterData(res): void {
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
    navigationExtras.queryParams = {top: event.pageSize, skip: event.pageIndex * event.pageSize};
    this._navigate(navigationExtras);
  }

  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  ngOnDestroy() {
    this.results.clear();
    this.componentHost.viewContainerRef.clear();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
