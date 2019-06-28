import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, Type,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
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
  styleUrls: ['./data-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 *
 */
export class DataListComponent implements OnInit, OnDestroy {

  /**
   * help panel element
   */
  @ViewChild('helppanel', {static: true}) helpPanel: MatDrawer;
  @ViewChild('filters', {static: true}) filterPanel: FilterPanelComponent;

  /**
   * show loading spinner
   * @type {boolean}
   */
  loading = false;

  /**
   * holder for injected elements
   */
  @ViewChild(CustomContentDirective, {static: true}) componentHost: CustomContentDirective;

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

  loadedComponents: Map<any, any> = new Map<any, any>();

  componentsLoaded = false;
  path: string;
  data: any[];
  search: any[];
  etag: string;
  sideway: string[];

  /**
   * set up routing and component injection
   * @param {ActivatedRoute} _route
   * @param {Router} router
   * @param ref
   * @param {PharosApiService} pharosApiService
   * @param {BreakpointObserver} breakpointObserver
   * @param {LoadingService} loadingService
   * @param {HelpPanelOpenerService} helpPanelOpenerService
   * @param {PharosConfig} pharosConfig
   * @param {ComponentInjectorService} componentInjectorService
   */
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              public breakpointObserver: BreakpointObserver,
              public loadingService: LoadingService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private pharosConfig: PharosConfig,
              private componentInjectorService: ComponentInjectorService) {}

  /**
   * subscribe to loading service to toggle spinner
   * subscribe to data changes and load and inject required components
   */
  ngOnInit() {
    console.log(this);
    this.path = this._route.snapshot.data.path;
    this.data = this._route.snapshot.data.data.content;
    this.search = this._route.snapshot.data.search;
    this.etag = this._route.snapshot.data.data.etag;
    this.sideway = this._route.snapshot.data.data.sideway;

    if (!this.componentsLoaded) {
      this.makeComponents();
    }

    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

    this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());

    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.loading = res);

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.path = this._route.snapshot.data.path;
          this.data = this._route.snapshot.data.data.content;
          this.search = this._route.snapshot.data.search;
          this.etag = this._route.snapshot.data.data.etag;
          this.sideway = this._route.snapshot.data.data.sideway;
          this.makeComponents();
        }
      });
  }

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
  makeComponents() {
    const components: any = this.pharosConfig.getComponents(this.path, 'list');
    components.forEach(component => {
      // make component
      const instance: ComponentRef<any> = this.loadedComponents.get(component.token);
      console.log(instance);
      if(!instance) {
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const dynamicComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        if (dynamicComponent.instance.sortChange) {
          dynamicComponent.instance.sortChange.subscribe((event) => {
            this.sortTable(event);
          });
        }
        if (dynamicComponent.instance.pageChange) {
          dynamicComponent.instance.pageChange.subscribe((event) => {
            this.paginationChanges(event);
          });
        }

        if (this.search) {
          console.log(dynamicComponent);
          console.log(this);
          const data: any = this.search.filter(data => data.kind === dynamicComponent.instance.path)[0];
          console.log(data);
          dynamicComponent.instance.pageData = new PageData(data.data);
          dynamicComponent.instance.data = data.data.content;
        } else {
          dynamicComponent.instance.pageData = new PageData(this._route.snapshot.data.data);
          dynamicComponent.instance.data = this.data;
        }
        dynamicComponent.instance.etag = this.etag;
        dynamicComponent.instance.sideway = this.sideway;
        this.loadedComponents.set(component.token, dynamicComponent);
      } else {
        instance.instance.data = this.data;
        this.loadedComponents.set(component.token, instance);
      }

    });
    this.loading = false;
    this.loadingService.toggleVisible(false);
    this.componentsLoaded = true;
  }




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
      navigationExtras.queryParams = {
        order: sort,
        page: 1
      };
    }
    this._navigate(navigationExtras);
  }

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
        rows: event.pageSize
      };
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
