import {ChangeDetectorRef, Component, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Subject} from 'rxjs';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ActivatedRoute} from '@angular/router';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {HelpPanelOpenerService} from '../../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer} from '@angular/material';
import {DynamicPanelComponent} from "../../tools/dynamic-panel/dynamic-panel.component";
import {DataDetailsResolver} from "../../pharos-main/services/data-details.resolver";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']

})
export class DataDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  target: any;
  dynamicComponent: any;
  componentsLoaded = false;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  helpOpen: false;

  @ViewChild('helppanel') helpPanel: MatDrawer;


  constructor(private _route: ActivatedRoute,
              private componentLookupService: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService,
              private responseParserService: ResponseParserService,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private dataDetailsResolver: DataDetailsResolver,
              private ref: ChangeDetectorRef
  ) {
    super();
    this.path = this._route.snapshot.data.path;
    this.target = this._route.snapshot.data.target;
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
        this.ref.markForCheck(); // refresh the component manually
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
      this.ref.markForCheck(); // refresh the component manually

      this._data
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(obj => {
            dynamicComponent.instance.data = obj;
            this.ref.markForCheck(); // refresh the component manually
        });
    });
    this.componentsLoaded = true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}







/*

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {HelpPanelOpenerService} from '../../tools/help-panel/services/help-panel-opener.service';
import {DataDetailsResolver} from '../services/data-details.resolver';
import {DynamicPanelComponent} from '../../tools/dynamic-panel/dynamic-panel.component';
import {ComponentLookupService} from '../../services/component-lookup.service';
import {ComponentInjectorService} from '../../services/component-injector.service';
import {ResponseParserService} from '../../services/response-parser.service';

@Component({
  selector: 'gsrs-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  substance: any;
  dynamicComponent: any;
  componentsLoaded = false;
  COMPONENTS: Map<string, any> = new Map<string, any>();
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  helpOpen: false;

  @ViewChild('helppanel') helpPanel: MatDrawer;


  constructor(private _route: ActivatedRoute,
              public componentLookupService: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService,
              private responseParserService: ResponseParserService,
              private dataDetailsResolver: DataDetailsResolver,
              private helpPanelOpenerService: HelpPanelOpenerService,
              private ref: ChangeDetectorRef
  ) {
    super();
    this.path = this._route.snapshot.data.path;
    this.substance = this._route.snapshot.data.substance;
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
        this.ref.markForCheck(); // refresh the component manually
      });
  }

  trackByIndex = i => i;

  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }



  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}*/
