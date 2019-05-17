import {ChangeDetectorRef, Component, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {HelpPanelOpenerService} from '../../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer} from '@angular/material';
import {DynamicPanelComponent} from '../../tools/dynamic-panel/dynamic-panel.component';
import {DataDetailsResolver} from './data-details.resolver';
import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {PharosConfig} from "../../../config/pharos-config";
import {PharosBase} from "../../models/pharos-base";
import {PharosApiService} from "../../pharos-services/pharos-api.service";

/**
 * component that holds dynamically injected details panels for various object types
 * mainly configurable externally
 * This is the brain of the details pages.
 * it primarily handles the breadcrumb and header, along with class specific details sections, but is the main
 * distributor of api data
 */
@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']

})
export class DataDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * url path, used for retrieving object type
   */
  path: string;

  /**
   * holder object for data. since it could be a target, disease or ligand, it is generic
   */
  pharosObject: PharosBase;

  /**
   * boolean to track if load is finished, keeps the components from re-rendering on each data change
   * todo - see if efficient unsubscribe from each panel is sufficient
   */
  componentsLoaded = false;

  /**
   * the main div element that all components are injected into
   */
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  /**
   * reference to help menu to toggle opening and closing
   */
  @ViewChild('helppanel') helpPanel: MatDrawer;

  /**
   * set up lots of dependencies to watch for data changes, navigate and parse and inject components
   * @param {ActivatedRoute} _route
   * @param {Router} router
   * @param {PharosConfig} pharosConfig
   * @param {ComponentInjectorService} componentInjectorService
   * @param {PharosApiService} pharosApiService
   * @param {HelpPanelOpenerService} helpPanelOpenerService
   * @param {DataDetailsResolver} dataDetailsResolver
   * @param {ChangeDetectorRef} changeDetector
   * @param {ScrollDispatcher} scrollDispatcher
   */
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private pharosConfig: PharosConfig,
              private componentInjectorService: ComponentInjectorService,
              private pharosApiService: PharosApiService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private dataDetailsResolver: DataDetailsResolver,
              private changeDetector: ChangeDetectorRef,
              public scrollDispatcher: ScrollDispatcher
  ) {
    super();
    this.path = this._route.snapshot.data.path;
    this.pharosObject = this._route.snapshot.data.pharosObject;
  }

  /**
   * load components if not already there
   * set up subscriptions to watch help panel, data responses and router event changes
   */
  ngOnInit() {
    if (!this.componentsLoaded) {
      this.makeComponents();
    }

    this.helpPanelOpenerService.toggle$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.helpPanel.toggle());

    this.pharosApiService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this._data.next(res);
      });

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.path = this._route.snapshot.data.path;
        if (this._route.snapshot.data.pharosObject != this.pharosObject) {
          this.pharosObject = this._route.snapshot.data.pharosObject;
        }
      }
    });
  }

  /**
   * pick specified properties from a main data object
   * @param o
   * @param props
   * @returns {any}
   */
  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  /**
   * fetch components for a specific object type.
   * iterate over each component and call all apis listed
   * each api field is added to a tracking array
   * the component is dynamically generated and injected into the dom
   * the pharos object and pharos object id are injected into the dynamic component
   * the main path is injected into the component
   * the main data change subscription is watch, and on each change, the returned object is parsed to fetch
   * each field in the helper array
   * this data object is then injected into the dynamic component
   * todo this doesn't handle cases where there is no data returned to an object
   */
  makeComponents(): void {
    const components: any = this.pharosConfig.getComponents(this.path, 'details');
    components.forEach(component => {
      // start api calls before making component
      const keys: string[] = [];
      if (component.api) {
        component.api.forEach(apiCall => {
          if (apiCall.url && apiCall.url.length > 0) {
            const url = apiCall.url.replace('_id_', this.pharosObject.id);
            // this call is pushed up to the api and changes are subscribed to in the generic details page, then set here
            this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);
            // this will be used to track the object fields to get
            keys.push(apiCall.field);
          }
        });
      }
      // make component
      const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
      const dynamicComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
      // todo: fix this. this is terrible
      // this is to handle the fact that it could be a target, disease or ligand
      dynamicComponent.instance[this.path.slice(0, this.path.length - 1)] = this.pharosObject;
      dynamicComponent.instance.id = this.pharosObject.id;
      dynamicComponent.instance.path = this.path;

      this._data
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(obj => {
          if(obj) {
            dynamicComponent.instance.data = obj;
          }
        });
    });
    this.componentsLoaded = true;
  }

  /**
   * clean up subscriptions on navigation
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
