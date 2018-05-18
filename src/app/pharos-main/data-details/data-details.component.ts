import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Subject} from 'rxjs';
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
  path: string;
  dynamicComponent: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(private _route: ActivatedRoute,
              private componentLookupService: ComponentLookupService,
              private componentInjectorService: ComponentInjectorService,
              private responseParserService: ResponseParserService,
              private ref: ChangeDetectorRef) {
    this.path = this._route.snapshot.data.path;
  }

  ngOnInit() {
    if (this.path === 'topics') {
      const token: any = this.componentLookupService.lookupByPath(this.path, 'details');
      const dynamicComponentToken = this.componentInjectorService.getComponentToken(token);
      this.dynamicComponent = this.componentInjectorService.injectComponent(this.componentHost, dynamicComponentToken);
      this.dynamicComponent.instance.path = this.path;
    }
    this.responseParserService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
          // without this check, the component keeps refreshing
          if (!this.dynamicComponent) {
            const components: any = this.componentLookupService.lookupByPath(this.path, 'details');
            if (components) {
              components.forEach(component => {
                if (component.token) {
                  const dynamicComponentToken = this.componentInjectorService.getComponentToken(component.token);
                  this.dynamicComponent = this.componentInjectorService.injectComponent(this.componentHost, dynamicComponentToken);
                  this.dynamicComponent.instance.path = this.path;
                }
              })
            }
          }
        // pass though data changes - this includes both the object and other fetched fields (references/publications, etc)
        this.dynamicComponent.instance.data = res;
        this.ref.markForCheck(); // refresh the component manually
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
