import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef, Component, ContentChildren, ElementRef, HostListener, NgZone, OnDestroy, OnInit, QueryList,
  Renderer2, Type,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Subject} from 'rxjs';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {HelpPanelOpenerService} from '../../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatSidenavContainer} from '@angular/material';
import {DynamicPanelComponent} from "../../tools/dynamic-panel/dynamic-panel.component";
import {DataDetailsResolver} from "../../pharos-main/services/data-details.resolver";
import {CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher} from "@angular/cdk/scrolling";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']

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
  @ContentChildren('scrollSection') scrollSections: QueryList<ElementRef>;

scrollingSubscription;
  lastOffset;



  constructor(private _route: ActivatedRoute,
              private componentLookupService: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService,
              private responseParserService: ResponseParserService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private dataDetailsResolver: DataDetailsResolver,
              private changeDetector: ChangeDetectorRef,
              public scrollDispatcher: ScrollDispatcher,
              private _renderer: Renderer2,
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
    }


  myScrollHandler(event) {
    console.log(event)
    console.log(this);
  }
/*  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.log('You scrolled!');
  }*/


  ngAfterViewInit() {
    console.log(this);
    console.log(this.scrollDispatcher);
    console.log(this.scrollable);
   this.scrollDispatcher
      //.ancestorScrolled(this.componentHost.viewContainerRef.element)
       .scrolled()
      .subscribe((data: CdkScrollable) => {
        console.log(data);
        console.log(this);
        console.log(this.scrollable.elementScrolled());
        console.log(this.scrollable.getElementRef());
        this.scrollable.elementScrolled();
      //  this.onWindowScroll(data);
      });
/*    this.scrollable.elementScrolled().subscribe(() => {
      console.log("rrrrrrr");
    });*/

/*    this.sidenavContainer.scrollable.elementScrolled().subscribe(res=> {
      console.log('sdfsdfsfsdfs');
      console.log(res);
    })*/
  /*  this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      console.log(data);
      console.log(this.scrollable);
      if (data) {
        console.log(data);
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
      }
    });*/
    this._renderer.listen(this.scrollable.getElementRef().nativeElement.parentNode,
      'scroll', (event) => {
      console.log(event);
        // do stuff with the event
      });


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

  private onWindowScroll(data: CdkScrollable) {
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    if (this.lastOffset > scrollTop) {
      // console.log('Show toolbar');
    } else if (scrollTop < 10) {
      // console.log('Show toolbar');
    } else if (scrollTop > 100) {
      // console.log('Hide toolbar');
    }

    this.lastOffset = scrollTop;
  }
}
