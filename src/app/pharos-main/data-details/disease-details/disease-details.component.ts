import {Component, forwardRef, Inject, Injector, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {DataDetailsResolver} from "../../services/data-details.resolver";
import {Ligand} from "../../../models/ligand";
import {CustomContentDirective} from "../../../tools/custom-content.directive";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";
import {takeUntil} from "rxjs/operators";
import {ComponentLookupService} from "../../../pharos-services/component-lookup.service";
import {Disease} from "../../../models/disease";

@Component({
  selector: 'pharos-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  token: any;

  disease: Disease;

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {
    super();
  }

  ngOnInit() {
    this.disease = this.data.object;
    const components: any = this.componentLookupService.lookupByPath(this.path, 'panels');
    if (components) {
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        if(component.api) {
          component.api.forEach(apiCall => {
            if (apiCall.url.length > 0) {
              const url = apiCall.url.replace('_id_', this.disease.id);
              /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
              this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);

              /** this will be used to track the object fields to get */
              keys.push(apiCall.field);
            }
          });
        }
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        if (component.width) {
          childComponent.instance.width = component.width;
        }

        // todo need to cover when no results are returned - do we still want to make the component?
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(obj => {
            childComponent.instance.data = this.pick(obj, keys);
            childComponent.instance.id = obj.object.id;
            childComponent.instance.disease = obj.object;
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
