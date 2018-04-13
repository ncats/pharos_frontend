import {
  Component, ComponentFactoryResolver, forwardRef, Inject, InjectionToken, Injector, Input, OnInit, Type,
  ViewChild
} from '@angular/core';
import {Target} from '../../../models/target';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {Publication} from '../../../models/publication';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {subscribeToResult} from 'rxjs/util/subscribeToResult';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css'],

})

export class TargetDetailsComponent implements OnInit {
   @Input() data: any;
  @Input() path: string;

  private dataSource = new Subject<string>();
  data$ = this.dataSource.asObservable();

  target: Target;
  id: number;
  references: Publication[];
  dynamicComponent: any;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {  }

  ngOnInit() {
      this.target = this.data.object;
      this.references = this.data.references;

      const token: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
    // todo : this component might be needed to pass the data to the child components - see setData() below
    //  const dynamicComponentToken = this.componentInjectorService.getComponentToken(this.componentHost, token.main);
    //  this.dynamicComponent = this.componentInjectorService.injectComponent(this.componentHost, dynamicComponentToken);

      token.components.forEach(component => {
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(this.componentHost, component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        component.api.forEach(apiCall => {
          // todo this can be removed once all the fields are filled out (or left in for safety)
          if (apiCall.url.length > 0) {
            // this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here
            // currently, this doesn't allow the data to be set on the child components...
            this.dataDetailsResolver.getDetailsByUrl(apiCall.url.replace('_id_', this.target.id), apiCall.field);
             this.data$.subscribe(res => {
               if (childComponent.instance.data) {
                 childComponent.instance.data[apiCall.field] = res[apiCall.field];
               } else {
                 childComponent.instance.data = {};
                 childComponent.instance.data[apiCall.field] = res[apiCall.field];
               }
              if (childComponent.instance.dataSource) {
                childComponent.instance.dataSource.data = res[apiCall.field];
              }
            });
          }
        });
      });
  }



/* // setData(data: any): void {
  //  this.data = data;
 //   this.observableData = of(data);
//

 //     this.dataSource.next(data);
   // }
    if (this.dynamicComponent) {
    this.dynamicComponent.instance.target = this.data.object;
    this.dynamicComponent.instance.references = this.data.references;

    }
  }*/
}
