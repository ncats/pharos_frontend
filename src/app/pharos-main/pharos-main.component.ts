import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, OnDestroy, OnInit, Type,
  ViewChild
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {MatSidenav} from '@angular/material';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PharosPanel} from '../../config/components-config';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {NavSectionsService} from '../tools/sidenav-panel/services/nav-sections.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

export class PanelOptions {
  mode?: string;
  class?: string;
  opened?: boolean;
  fixedInViewport?: boolean;
  fixedTopGap?: number;
  role?: string;
}

@Component({
  selector: 'pharos-main',
  templateUrl: './pharos-main.component.html',
  styleUrls: ['./pharos-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PharosMainComponent implements OnInit, OnDestroy {
  @ViewChild('leftpanel', {static: true}) leftPanelInstance: MatSidenav;
  @ViewChild('rightpanel', {static: true}) rightPanelInstance: MatSidenav;


  // todo set as viewchildren, then map the array
  @ViewChild('lefttemplate', {static: true, read: CdkPortalOutlet}) leftPortalOutlet: CdkPortalOutlet;
  @ViewChild('righttemplate', {static: true, read: CdkPortalOutlet}) rightPortalOutlet: CdkPortalOutlet;
  @ViewChild('headertemplate', {static: true, read: CdkPortalOutlet}) headerPortalOutlet: CdkPortalOutlet;
  @ViewChild('contenttemplate', {static: true, read: CdkPortalOutlet}) contentPortalOutlet: CdkPortalOutlet;

  components: PharosPanel[];
  componentsLoaded = false;
  loadedComponents: Map<any, any> = new Map<any, any>();
  autosize = true;
  @Input() data: any = {};
  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    private helpDataService: HelpDataService,
    private navSectionsService: NavSectionsService,
    private componentInjectorService: ComponentInjectorService
  ) {

  }

  ngOnInit() {
    console.log(this);
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
          this.changeRef.detectChanges();
        }
      });
  }

  makeComponents() {
    this.components.forEach(component => {
      let portalOutlet: CdkPortalOutlet;
      // make component
      const instance: ComponentRef<any> = this.loadedComponents.get(component.token);
      if (!instance) {
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
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
        if (component.section === 'leftPortalOutlet' && componentInstance.instance['panelOptions']) {
         Object.entries(componentInstance.instance['panelOptions']).forEach(ent => this.leftPanelInstance[ent[0]] = ent[1]);
         // handle emitted close events
         if (componentInstance.instance.menuToggle) {
            componentInstance.instance.menuToggle.subscribe(res => this.leftPanelInstance.toggle(res));
          }
        }

        // right side panel functionality
        if (component.section === 'rightPortalOutlet' && componentInstance.instance['panelOptions']) {
         Object.entries(componentInstance.instance['panelOptions']).forEach(ent => this.rightPanelInstance[ent[0]] = ent[1]);
         // handle emitted close events
         if (componentInstance.instance.menuToggle) {
            componentInstance.instance.menuToggle.subscribe(res => this.rightPanelInstance.toggle(res));
          }
        }

        if (component.navHeader) {
          componentInstance.instance.description = component.navHeader.mainDescription;
          componentInstance.instance.apiSources = component.api;
          componentInstance.instance.field = component.navHeader.section;
          componentInstance.instance.label = component.navHeader.label;
          this.changeRef.markForCheck();
        }

        // put this last or errors are thrown because the instance keeps getting used.
        if (componentInstance.instance.selfDestruct) {
          componentInstance.instance.selfDestruct.subscribe(res => {
            if (res) {
              componentInstance.destroy();
              // this.changeRef.markForCheck();
              // componentPortal.detach();
            }
          });
        }
     this.componentsLoaded = true;
     this.autosize = false;
     this.loadedComponents.set(component.token, componentInstance);
     this.changeRef.markForCheck();
      } else {
        instance.instance.data = this.data.results;
        this.loadedComponents.set(component.token, instance);
        this.changeRef.detectChanges();
      }
    });
  }


  /**
   * close full width filter panel when clicking outside of panel
   */
  close() {
   /* if (this.filterPanel.fullWidth) {
      this.filterPanel.fullWidth = false;
      this.filterPanel.closeMenu();
    }*/
  }

  /**
   * clears data
   * empties component
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
