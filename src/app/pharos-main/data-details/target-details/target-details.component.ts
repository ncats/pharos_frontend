import {
  AfterViewInit,
  ApplicationRef, ChangeDetectorRef,
  Component, ContentChildren, ElementRef, forwardRef, HostListener, Inject, Injector, Input, OnDestroy, OnInit,
  QueryList, Renderer2, Type,
  ViewChild, ViewChildren, ViewEncapsulation
} from '@angular/core';
import {Target} from '../../../models/target';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {Publication} from '../../../models/publication';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from "../../../tools/sidenav-panel/services/nav-sections.service";
import {DOCUMENT} from "@angular/common";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/scrolling";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {MatSidenavContainer} from "@angular/material";
import {HelpDataService} from "../../../tools/help-panel/services/help-data.service";

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.scss']
})

export class TargetDetailsComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() path: string;
  token: any;
  sections: string[] = [];
  navIsFixed = false;
  activeElement: string;

  @Input() target: Target;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;


  constructor(
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private render: Renderer2,
    private dataDetailsResolver: DataDetailsResolver,
    private router: Router,
    private route: ActivatedRoute,
    private navSectionsService: NavSectionsService,
    private changeDetector: ChangeDetectorRef,
    private scrollDispatcher: ScrollDispatcher,
    private helpDataService: HelpDataService,
    private componentInjectorService: ComponentInjectorService) {
    super();

  }

  ngOnInit() {
/*    this.render.listen('window', 'scroll', ()=> {
      console.log('scroll')
      console.log(window.scrollY);
    });*/
    console.log(this);
   // console.log(this);
    const components: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
    if (components) {
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        component.api.forEach(apiCall => {
          if (apiCall.url && apiCall.url.length > 0) {
            const url = apiCall.url.replace('_accession_', this.target.accession).replace('_id_', this.target.id);
              /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
              this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);

            /** this will be used to track the object fields to get */
            keys.push(apiCall.field);
          }
        });
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
      //  childComponent.instance.scrollDispatcher.register();
        if (component.navHeader) {
        //  console.log(component.navHeader);
          this.sections.push(component.navHeader);
          this.navSectionsService.setSections(Array.from(new Set([...this.sections])));
          this.helpDataService.setSources(component.navHeader.section,
            {
              sources: component.api,
              title: component.navHeader.label,
              mainDescription: component.navHeader.mainDescription ? component.navHeader.mainDescription : null
            }
            );
        }

        // todo need to cover when no results are returned - do we still want to make the component?
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(obj => {
            childComponent.instance.target = this.target;
            childComponent.instance.id = this.target.accession;
            const dataObject = this.pick(obj, keys);
            if (!Object.values(dataObject).includes(undefined)) {
              childComponent.instance.data = dataObject;
            }
          });
      });
    }

  }

  ngAfterViewInit() {

    this.scrollDispatcher
    //.ancestorScrolled(this.componentHost.viewContainerRef.element)
      .scrolled()
      .subscribe((data: CdkScrollable) => {
      //  console.log(data);
        //  this.onWindowScroll(data);
      });

    if (this.route.snapshot.fragment) {
      this.scrollToSection(this.route.snapshot.fragment);
/*      const elem = this.document.getElementById(`${this.route.snapshot.fragment}`);
      console.log(elem);
      if (elem) {
        elem.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }*/
    }
  }

   pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

scrollToSection(event: any) {
  let navigationExtras: NavigationExtras = {
    fragment: `${event}`
  };

  this.router.navigate([], navigationExtras);

}


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
