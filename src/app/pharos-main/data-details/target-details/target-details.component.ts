import {
  AfterViewInit,
  ApplicationRef, ChangeDetectorRef,
  Component, ElementRef, forwardRef, HostListener, Inject, Injector, Input, OnDestroy, OnInit, QueryList, Type,
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
import {TrackScrollDirective} from "../../../tools/sidenav-panel/directives/track-scroll.directive";

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


  constructor(
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private navSectionsService: NavSectionsService,
    private changeDetector: ChangeDetectorRef,
    private scrollDispatcher: ScrollDispatcher,
    private componentInjectorService: ComponentInjectorService) {
    super();
  }

  ngOnInit() {
    console.log(this);
    const components: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
    if (components) {
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        component.api.forEach(apiCall => {
          if (apiCall.url.length > 0) {
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

        if (component.navHeader) {
          console.log(component.navHeader);
          this.sections.push(component.navHeader);
          this.navSectionsService.setSections(Array.from(new Set([...this.sections])));
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
    console.log(this);
    // track scrolling for active sidenav display
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      console.log(data);
      if (data) {
        console.log(data);
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
        if (scrollTop === 100) {
          this.activeElement = 'introduction';
          this.changeDetector.detectChanges();
        } else {
          this.scrollSections.forEach(section => {
            scrollTop = scrollTop - section.nativeElement.scrollHeight;
            if (scrollTop >= 0) {
              this.activeElement = section.nativeElement.nextSibling.id;
              this.changeDetector.detectChanges();
            }
          });
        }
      }
    });
  }

   pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

/*
  /!**
   * method that checks to see if the user has scrolled past a certain point. pinned to the window object
   * @returns void
   *!/
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // todo: work around window api for angular universal
    console.log(window.pageYOffset);
    console.log(this.document.documentElement.scrollTop);
    console.log(this.document.body.scrollTop);
    if (window.pageYOffset > 100 || this.document.documentElement.scrollTop > 100 || this.document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset < 10 || this.document.documentElement.scrollTop < 10 || this.document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }
*/


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
