import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef, Component, ContentChildren, ElementRef, NgZone, OnDestroy, OnInit, QueryList, Type, ViewChild,
  ViewChildren
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Subject} from 'rxjs';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ActivatedRoute} from '@angular/router';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {HelpPanelOpenerService} from '../../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatSidenavContainer} from '@angular/material';
import {DynamicPanelComponent} from "../../tools/dynamic-panel/dynamic-panel.component";
import {DataDetailsResolver} from "../../pharos-main/services/data-details.resolver";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/scrolling";
import {map} from "rxjs/internal/operators";
import {TrackScrollDirective} from "../../tools/sidenav-panel/directives/track-scroll.directive";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css'],
  directives: [TrackScrollDirective]

})
export class DataDetailsComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  path: string;
  target: any;
  dynamicComponent: any;
  componentsLoaded = false;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  helpOpen: false;

  @ViewChild('helppanel') helpPanel: MatDrawer;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
/*
  @ViewChildren('scrollSection', {read: ElementRef}) scrollSections: QueryList<ElementRef>;
*/
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  @ContentChildren('scrollSection') scrollSections: QueryList<ElementRef>;






  constructor(private _route: ActivatedRoute,
              private componentLookupService: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService,
              private responseParserService: ResponseParserService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private dataDetailsResolver: DataDetailsResolver,
              private changeDetector: ChangeDetectorRef,
              public scrollDispatcher: ScrollDispatcher,
              private app:ApplicationRef,
              private zone: NgZone
  ) {
    super();
    this.path = this._route.snapshot.data.path;
    this.target = this._route.snapshot.data.target;


  }


  ngOnInit() {
    console.log(this);

    if (!this.componentsLoaded) {
      this.makeComponents();
    }
    this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());
    this.responseParserService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this._data.next(res);
        this.changeDetector.markForCheck(); // refresh the component manually
      });


   // const scrollable = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef)[0]; console.log(scrollable.getElementRef().nativeElement.scrollTop);
  }

  ngAfterContentInit() {
    this.scrollSections.changes.subscribe(changes => console.log(changes));

  }

  ngAfterViewInit() {
    console.log(this);
    this.scrollSections.changes.subscribe(changes => console.log(changes));

    this.scrollable.elementScrolled().subscribe((data) => {
      console.log(data);
      console.log('scrolled!');
    })
/*    console.log(this);
    this.sidenavContainer.scrollable.elementScrolled().subscribe((event: Event) => {
      console.log(event);
    })

    this.scrollable.elementScrolled().subscribe(() => {
      console.log("rrrrrrr");
    }/!* react to scrolling *!/);*/
    // track scrolling for active sidenav display
  // this.scrollDispatcher.register(this.scrollable);
    console.log(this.scrollDispatcher);
    this.scrollDispatcher.scrolled(100).pipe(
      map((data: CdkScrollable) => {
        console.log(data);
      if (data) {
        console.log(data);
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
        if (scrollTop === 100) {
          //    this.activeElement = 'introduction';
          this.changeDetector.detectChanges();
        } else {
          this.scrollSections.forEach(section => {
            scrollTop = scrollTop - section.nativeElement.scrollHeight;
            if (scrollTop >= 0) {
              //   this.activeElement = section.nativeElement.nextSibling.id;
              this.changeDetector.detectChanges();
            }
          });
        }
      }
    }));
  }

  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  makeComponents(): void {
    const components: any = this.componentLookupService.lookupByPath(this.path, 'details');
    components.forEach(component => {
      // start api calls before making component
      const keys: string[] = [];
      if (component.api) {
        component.api.forEach(apiCall => {
          if (apiCall.url.length > 0) {
            const url = apiCall.url.replace('_id_', this.target.id);
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
      dynamicComponent.instance.target = this.target;
      dynamicComponent.instance.id = this.target.id;
      dynamicComponent.instance.path = this.path;
      this.changeDetector.markForCheck(); // refresh the component manually

      this._data
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(obj => {
            dynamicComponent.instance.data = obj;
            this.changeDetector.markForCheck(); // refresh the component manually
        });
    });
    this.componentsLoaded = true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
