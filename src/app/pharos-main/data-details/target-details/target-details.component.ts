import {
  Component, forwardRef, Inject, Injector, Input, OnInit, Type,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {Target} from '../../../models/target';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {Publication} from '../../../models/publication';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']

})

export class TargetDetailsComponent implements OnInit {
  @Input() data: any;
  path: string;
  private dataSource = new Subject<string>();
  data$ = this.dataSource.asObservable();

  target: Target;
  references: Publication[];
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {  }

  ngOnInit() {
    this.target = this.data.object;
    this.references = this.data.references;
    if(this.path) {
      const token: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
        token.components.forEach(component => {
          const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(this.componentHost, component.token);
          const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
          if(component.width){
            childComponent.instance.width = component.width;
          }
          const childData: any = {};
          component.api.forEach(apiCall => {
            // todo this can be removed once all the fields are filled out (or left in for safety)
            if (apiCall.url.length > 0) {
              // todo maybe set this as a merge map so all api calls go out as one instead of iterating
              // this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here
              // currently, this doesn't allow the data to be set on the child components...
              this.dataDetailsResolver.getDetailsByUrl(apiCall.url.replace('_id_', this.target.id), apiCall.field);
              this.data$.subscribe(res => {
         /*       console.log(res);
                if (childComponent.instance.data) {
                  childComponent.instance.data[apiCall.field] = res[apiCall.field];
                } else {
                  childComponent.instance.data = {};
                  childComponent.instance.data[apiCall.field] = res[apiCall.field];
                }*/
                if (childComponent.instance.dataSource) {
                  childComponent.instance.dataSource.data = res[apiCall.field];
                }else {
                  childData[apiCall.field] = res[apiCall.field]
                }
              });
            }
          });
          console.log(childData);
          // wait until all api calls are finished
          childComponent.instance.data = childData;
        });
      }
  }



  setData(data: any): void {
    this.data = data;
    this.dataSource.next(data);
  }
}
