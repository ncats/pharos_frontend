import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Subject} from 'rxjs/Subject';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {ActivatedRoute} from '@angular/router';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';

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
        this.data = res;
        if (!this.dynamicComponent) {
          const token: any = this.componentLookupService.lookupByPath(this.path, 'details');
          const dynamicComponentToken = this.componentInjectorService.getComponentToken(this.componentHost, token);
          this.dynamicComponent = this.componentInjectorService.injectComponent(this.componentHost, dynamicComponentToken);
          this.dynamicComponent.instance.path = this.path;
        }
        // pass though data changes - this includes both the object and other fetched fields (references/publications, etc)
        this.dynamicComponent.instance.setData(res);

      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
