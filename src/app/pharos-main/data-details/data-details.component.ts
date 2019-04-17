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
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
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
export class DataDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  pharosObject: any;
  dynamicComponent: any;
  componentsLoaded = false;
  navigationSubscription;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  @ViewChild('helppanel') helpPanel: MatDrawer;



  constructor(private _route: ActivatedRoute,
              private router: Router,
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
    this.pharosObject = this._route.snapshot.data.target;
  }


  ngOnInit() {
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

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.path = this._route.snapshot.data.path;
        if(this._route.snapshot.data[this.path] != this.pharosObject) {
          this.pharosObject = this._route.snapshot.data[this.path];
/*         this.componentHost.viewContainerRef.clear();
         this.changeDetector.markForCheck(); // refresh the component manually
         this.makeComponents();*/
        }
      }
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
      dynamicComponent.instance[this.path.slice(0,this.path.length-1)] = this.pharosObject;
      dynamicComponent.instance.id = this.pharosObject.id;
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
