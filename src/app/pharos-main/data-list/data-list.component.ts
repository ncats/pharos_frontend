import {Component, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {LoadingService} from '../../pharos-services/loading.service';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {takeUntil} from 'rxjs/operators';
import {DataListResolver} from './data-list.resolver';
import {PageData} from '../../models/page-data';
import {PharosConfig} from '../../../config/pharos-config';
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {FacetRetrieverService} from "./filter-panel/facet-retriever.service";
import {FilterPanelComponent} from "./filter-panel/filter-panel.component";
import {MatDrawer, MatSidenav} from "@angular/material";
import {HelpPanelOpenerService} from "../../tools/help-panel/services/help-panel-opener.service";
import {BreakpointObserver} from "@angular/cdk/layout";

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

/**
 * main panel to hold list data for targets, diseases and ligands
 */
@Component({
  selector: 'pharos-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

/**
 *
 */
export class DataListComponent implements OnInit, OnDestroy {

  /**
   * help panel element
   */
  @ViewChild('helppanel') helpPanel: MatDrawer;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('filters') filterPanel: FilterPanelComponent;

  /**
   * show loading spinner
   * @type {boolean}
   */
  loading = false;

  /**
   * holder for injected elements
   */
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  /**
   * subject for unsubscribing on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  /**
   * boolean for mobile view
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * set up routing and component injection
   * @param {ActivatedRoute} _route
   * @param {Router} router
   * @param {PharosApiService} pharosApiService
   * @param {BreakpointObserver} breakpointObserver
   * @param {FacetRetrieverService} facetRetrieverService
   * @param {DataListResolver} dataListResolver
   * @param {LoadingService} loadingService
   * @param {HelpPanelOpenerService} helpPanelOpenerService
   * @param {PharosConfig} pharosConfig
   * @param {ComponentInjectorService} componentInjectorService
   */
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private pharosApiService: PharosApiService,
              public breakpointObserver: BreakpointObserver,
  private facetRetrieverService: FacetRetrieverService,
              private dataListResolver: DataListResolver,
              private loadingService: LoadingService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private pharosConfig: PharosConfig,
              private componentInjectorService: ComponentInjectorService) {}


  // todo: (targets, diseases, etc) and call each api. This turns search into multiple separate calls/components, and leaves
  // todo: pagins/filtering as single components

  /**
   * subscribe to loading service to toggle spinner
   * subscribe to data changes and load and inject required components
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

    this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());

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
    this.pharosApiService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res.content) {
          this.componentHost.viewContainerRef.clear();
          res.content.forEach(dataList => {
            const components: any = this.pharosConfig.getComponents(dataList.kind, 'list');
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
        }
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
  /**
   * sort table handler
   * linked to injected table/list
   * most sorting is done by url paramater changes
   * @param event
   */
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

/*  /!**
   * get all facets
   *!/
  loadFacets() {
    this.facetRetrieverService._loaded.next(true);
  }*/

  /**
   * close full width filter panel when clicking outside of panel
   */
  close() {
    if (this.filterPanel.fullWidth) {
      this.filterPanel.fullWidth = false;
      this.filterPanel.closeMenu();
    }
  }
  /**
   * change pages of list
   * @param event
   */
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

  /**
   * navigate on changes, mainly just changes url, shouldn't reload entire page, just data
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  /**
   * clears data
   * empties component
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.componentHost.viewContainerRef.clear();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
