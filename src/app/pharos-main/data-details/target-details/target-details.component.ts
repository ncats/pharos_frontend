import {
  Component, forwardRef, Inject, Injector, Input, OnDestroy, OnInit, Type,
  ViewChild, ViewEncapsulation
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

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']

})

export class TargetDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  token: any;

  target: Target;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {
    super();
  }

  // todo: target header has an api call, so it may need to be injected. The flex layout is tricky though.
  ngOnInit() {
    this.target = this.data.object;
    const components: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
    if (components) {
      console.log(components);
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        component.api.forEach(apiCall => {
          if (apiCall.url.length > 0) {
            /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
            this.dataDetailsResolver.getDetailsByUrl(apiCall.url.replace('_id_', this.target.id), apiCall.field);
            /** this will be used to track the object fields to get */
            keys.push(apiCall.field);
          }
        });
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        if (component.width) {
          childComponent.instance.width = component.width;
        }

        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(obj => {
            console.log(keys);
            console.log(Object.assign({},obj));
            console.log(this.pick(obj, keys));
            childComponent.instance.data = this.pick(obj, keys);
          });
      });
    }
  }

   pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
