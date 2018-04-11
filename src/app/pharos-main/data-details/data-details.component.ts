import {Component, ComponentFactoryResolver, Inject, Injector, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {Subject} from "rxjs/Subject";
import {CustomContentDirective} from "../../tools/custom-content.directive";
import {ActivatedRoute} from "@angular/router";
import {ComponentLookupService} from "../../pharos-services/component-lookup.service";
import {ComponentInjectorService} from "../../pharos-services/component-injector.service";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit, OnDestroy {
  data: any = {};
  path: string;
  dynamicComponent: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _route: ActivatedRoute,
    private componentLookupService: ComponentLookupService,
    private componentInjectorService: ComponentInjectorService,
    private responseParserService: ResponseParserService,
  ) {
    this.path = this._route.snapshot.data.path;
  }

  ngOnInit() {



    this.responseParserService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.log(res);
        this.data = res;
        if (!this.dynamicComponent) {
          console.log("make component");
          const token: any = this.componentLookupService.lookupByPath(this.path, 'details');
          this.dynamicComponent = this.componentInjectorService.injectComponentToken(this.componentHost, token);
          this.dynamicComponent.instance.path = this.path;
        }
        // pass though data changes - this includes both the object and other fetched fields (references/publications, etc)
        console.log("changid");
        this.dynamicComponent.instance.setData(res);

      });
    console.log(this);
  }

  ngOnChanges(change){
    console.log(change);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
