import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef, HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Type,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PharosPanel} from '../../config/components-config';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {isPlatformBrowser} from '@angular/common';
import {SelectedFacetService} from './data-list/filter-panel/selected-facet.service';
import {DynamicServicesService} from '../pharos-services/dynamic-services.service';

/**
 * class or interface to set properties for an injected sidenav panel
 */
export class PanelOptions {
  /**
   * sidenav panel mode, 'push' 'over' or 'side'
   */
  mode?: string;

  /**
   * optional sidenav panel class
   */
  class?: string;

  /**
   * set panel to be opened or closed by default
   */
  opened?: boolean;

  /**
   * fix sidenav in viewport
   */
  fixedInViewport?: boolean;

  /**
   * top gap for fixed panel, bumps the sidenav down for headers
   */
  fixedTopGap?: number;

  /**
   * sidenav role, ie navigation
   */
  role?: string;
}

/**
 * main component that hold all injected panels
 */
@Component({
  selector: 'pharos-main',
  templateUrl: './pharos-main.component.html',
  styleUrls: ['./pharos-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PharosMainComponent implements OnInit, OnDestroy {
  // todo set as viewchildren, then map the array
  /**
   * left sidenav panel instance
   */
  @ViewChild('leftpanel', {static: true}) leftPanelInstance: MatSidenav;
  /**
   * right sidenav panel instance
   */
  @ViewChild('rightpanel', {static: true}) rightPanelInstance: MatSidenav;
  /**
   * left sidenav panel instance
   */
  @ViewChild('lefttemplate', {static: true, read: CdkPortalOutlet}) leftPortalOutlet: CdkPortalOutlet;
  /**
   * right sidenav panel instance
   */
  @ViewChild('righttemplate', {static: true, read: CdkPortalOutlet}) rightPortalOutlet: CdkPortalOutlet;

  /**
   * full width headet area
   */
  @ViewChild('headertemplate', {static: true, read: CdkPortalOutlet}) headerPortalOutlet: CdkPortalOutlet;
  /**
   * content are, constrained by sidenavs, if applicable
   */
  @ViewChild('contenttemplate', {static: true, read: CdkPortalOutlet}) contentPortalOutlet: CdkPortalOutlet;

  /**
   * full width footer template
   */
  @ViewChild('footertemplate', {static: true, read: CdkPortalOutlet}) footerPortalOutlet: CdkPortalOutlet;

  /**
   * list of pharos panel component objects
   */
  components: PharosPanel[];

  /**
   * track loaded and injected components
   * @type {Map<any, any>}
   */
  loadedComponents: Map<any, any> = new Map<any, any>();

  /**
   * boolean to adjust the content area size based on sidenavs. set to false when all items loaded.
   * @type {boolean}
   */
  autosize = true;

  /**
   * data object
   * @type {{}}
   */
  @Input() data: any = {};
  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * boolean to toggle mobile views and parameters
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * add necessary services
   * @param {Router} router
   * @param {ActivatedRoute} _route
   * @param _injector
   * @param {ChangeDetectorRef} changeRef
   * @param {HelpDataService} helpDataService
   * @param {BreakpointObserver} breakpointObserver
   * @param {ComponentInjectorService} componentInjectorService
   */
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _injector: Injector,
    private changeRef: ChangeDetectorRef,
    private helpDataService: HelpDataService,
    public breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformID: any,
    private selectedFacetService: SelectedFacetService,
    public dynamicServices: DynamicServicesService
  ) {

  }

  /**
   * set mobile view
   * fetch data from route
   * fetch component configs
   * generate new components
   * subsctibe to router change events and re-generate components and reset data
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    this.data = this._route.snapshot.data;
    this.components = this.data.components;
    this.makeComponents();

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.data = this._route.snapshot.data;
          this.makeComponents();
          this.runTutorial();
        }
      });
    this.runTutorial();
  }

  runTutorial() {
    const tutorial = this._route.snapshot.queryParamMap.get('tutorial');
    switch (tutorial) {
    }
  }


  /**
   * iterate over each component, make a CDKPortalOutlet, inject it, and set required properties. Sets up listeners
   * for event emitting
   */
  makeComponents() {
    this.components.forEach(component => {
      if (component) {
        let portalOutlet: CdkPortalOutlet;
        // make component
        const instance: ComponentRef<any> = this.loadedComponents.get(component.token);
        if (!instance) {
          const dynamicChildToken: Type<any> = this._injector.get<Type<any>>(component.token);
          if (component.section) {
            portalOutlet = this[component.section];
          } else {
            portalOutlet = this.contentPortalOutlet;
          }
          const componentPortal = new ComponentPortal<any>(
            dynamicChildToken
          );
          const componentInstance: ComponentRef<any> = portalOutlet.attachComponentPortal(componentPortal);
          componentInstance.instance.data = this.data.results;

          // left side panel functionality
          if (component.section === 'leftPortalOutlet' && componentInstance.instance.panelOptions) {
            Object.entries(componentInstance.instance.panelOptions).forEach(ent => this.leftPanelInstance[ent[0]] = ent[1]);
            // handle emitted close events
            if (componentInstance.instance.menuToggle) {
              componentInstance.instance.menuToggle.subscribe(res => this.leftPanelInstance.toggle(res));
            }
          }

          // right side panel functionality
          if (component.section === 'rightPortalOutlet' && componentInstance.instance.panelOptions) {
            Object.entries(componentInstance.instance.panelOptions).forEach(ent => this.rightPanelInstance[ent[0]] = ent[1]);
            // handle emitted close events
            if (componentInstance.instance.menuToggle) {
              componentInstance.instance.menuToggle.subscribe(res => this.rightPanelInstance.toggle(res));
            }
          }

          if (component.navHeader) {
            componentInstance.instance.description = component.navHeader.mainDescription;
            componentInstance.instance.mainSource = component.navHeader.mainSource;
            componentInstance.instance.apiSources = component.api;
            componentInstance.instance.field = component.navHeader.section;
            componentInstance.instance.label = component.navHeader.label;
            this.changeRef.markForCheck();
          }

          // put this last or errors are thrown because the instance keeps getting used.
          if (componentInstance.instance.selfDestruct) {
            componentInstance.instance.selfDestruct.subscribe(res => {
              if (res) {
                this.loadedComponents.delete(component.token);
                componentInstance.destroy();
              }
            });
          }
          this.autosize = false;
          this.loadedComponents.set(component.token, componentInstance);
          this.changeRef.markForCheck();
        } else {
          instance.instance.data = this.data.results;
          this.loadedComponents.set(component.token, instance);
          this.changeRef.detectChanges();
        }
      }
    });
  }


  /**
   * close full width filter panel when clicking outside of panel
   */
  close() {
    [...this.loadedComponents.values()].forEach(component => {
      if (component.instance.fullWidth && component.instance.panelOptions) {
        component.instance.fullWidth = false;
        component.instance.panelOptions.opened = false;
        component.instance.changeRef.markForCheck();
      }
    });
  }

  /**
   * SSR doesn't set the padding right for mat-sidenav-content. this is a workaround until this is fixed:
   * https://github.com/angular/components/issues/8969
   * also, the server won't know about this.isSmallScreen, because media queries don't work on the server
   */
  getClassForMarginsOnServer() {
    if (isPlatformBrowser(this.platformID)) {
      return '';
    }
    if (this._route.snapshot.data.subpath === 'list') {
      return 'wideNavPanel';
    }
    if (this._route.snapshot.data.subpath === 'details' && ['targets', 'diseases'].includes(this._route.snapshot.data.path)) {
      return 'thinNavPanel';
    }
    return '';
  }

  isList() {
    return this._route.snapshot.data.subpath !== 'list'
      && this._route.snapshot.data.subpath !== 'analyze';
  }

  /**
   * clears data
   * empties component
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.selectedFacetService.clearFacets();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
