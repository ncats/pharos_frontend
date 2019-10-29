import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnInit, Type, ViewChild} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {PharosFooterComponent} from '../tools/pharos-footer/pharos-footer.component';
import {MatDrawer, MatSidenav} from '@angular/material';
import {FilterPanelComponent} from './data-list/filter-panel/filter-panel.component';
import {ActivatedRoute} from '@angular/router';
import {PharosPanel} from '../../config/components-config';
import {PageData} from '../models/page-data';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {Position} from '@angular/compiler/src/aot/formatted_error';
import {NavSectionsService} from '../tools/sidenav-panel/services/nav-sections.service';

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
export class PharosMainComponent implements OnInit {
  @ViewChild('leftpanel', {static: true}) leftPanelInstance: MatSidenav;
  @ViewChild('rightpanel', {static: true}) rightPanelInstance: MatSidenav;

  @ViewChild('lefttemplate', {static: true, read: CdkPortalOutlet}) leftPortalOutlet: CdkPortalOutlet;
  @ViewChild('righttemplate', {static: true, read: CdkPortalOutlet}) rightPortalOutlet: CdkPortalOutlet;
  @ViewChild('headertemplate', {static: true, read: CdkPortalOutlet}) headerPortalOutlet: CdkPortalOutlet;
  @ViewChild('contenttemplate', {static: true, read: CdkPortalOutlet}) contentPortalOutlet: CdkPortalOutlet;

  components: PharosPanel[];
  componentsLoaded = false;
  loadedComponents: Map<any, any> = new Map<any, any>();

  constructor(
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    private helpDataService: HelpDataService,
    private navSectionsService: NavSectionsService,
    private componentInjectorService: ComponentInjectorService
  ) {

  }

  ngOnInit() {
    console.log(this);
    this.components = this._route.snapshot.data.components;
    this.makeComponents();
  }

  makeComponents() {
    /*const newPD = new PageData({
      top: this._route.snapshot.queryParamMap.has('rows') ? +this._route.snapshot.queryParamMap.get('rows') : 10,
      skip: (+this._route.snapshot.queryParamMap.get('page') - 1) * + this._route.snapshot.queryParamMap.get('rows'),
      total: this._route.snapshot.data.results.count
    });*/
    //  const components: any = this.pharosConfig.getComponents(this.path, 'list');
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
        componentInstance.instance.data =  this._route.snapshot.data.results;

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
          /*this.helpDataService.setSources(component.navHeader.section,
            {
              sources: component.api,
              title: component.navHeader.label,
              mainDescription: component.navHeader.mainDescription ? component.navHeader.mainDescription : null
            }
          );*/
          componentInstance.instance.description = component.navHeader.mainDescription;
          componentInstance.instance.apiSources = component.api;
          componentInstance.instance.field = component.navHeader.section;
          componentInstance.instance.label = component.navHeader.label;
          this.changeRef.detectChanges();
        }

        // put this last or errors are thrown because the instance keeps getting used.
        if (componentInstance.instance.selfDestruct) {
          componentInstance.instance.selfDestruct.subscribe(res => {
            componentInstance.destroy();
            componentPortal.detach();
          });
        }
        /* const dynamicComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
         if (this.search && this.search.length) {
           const data: any = this.search.filter(datum => datum.kind === dynamicComponent.instance.path)[0];
           dynamicComponent.instance.pageData = newPD;
           dynamicComponent.instance.data = data.data.content;
         } else {
           dynamicComponent.instance.pageData = newPD;
           dynamicComponent.instance.data = this.data;
         }
         dynamicComponent.instance.etag = this.etag;
         dynamicComponent.instance.sideway = this.sideway;

         if (dynamicComponent.instance.sortChange) {
           dynamicComponent.instance.sortChange.subscribe((event) => {
             if (this.path === 'search') {
               this.typePagination(event, dynamicComponent.instance.path).subscribe(res => {
                 dynamicComponent.instance.data = res.content;
               });
             } else {
               this.sortTable(event);
             }
           });
         }
         if (dynamicComponent.instance.pageChange) {
           dynamicComponent.instance.pageChange.subscribe((event) => {
             console.log("page change");
             console.log(event);
             if (this.path === 'search') {
               this.typePagination(event, dynamicComponent.instance.path).subscribe(res => {
                 dynamicComponent.instance.data = res.content;
               });
             } else {
               this.paginationChanges(event);
             }
           });
         }

         this.loadedComponents.set(component.token, dynamicComponent);
       } else {
         if (this.search && this.search.length) {
           const data: any = this.search.filter(datum => datum.kind === instance.instance.path)[0];
           instance.instance.pageData = newPD;
           instance.instance.data = data.data.content;
         } else {
           instance.instance.pageData = newPD;
           instance.instance.data = this.data;

           this.loadedComponents.set(component.token, instance);
           this.changeRef.markForCheck();
         }
       }
     });
     */
     this.componentsLoaded = true;
     this.changeRef.detectChanges();
      } else {
        instance.instance.data = this._route.snapshot.data.results;
        this.loadedComponents.set(component.token, instance);
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
}
