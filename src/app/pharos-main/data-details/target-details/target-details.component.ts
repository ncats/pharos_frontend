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
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']

})

export class TargetDetailsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  path: string;
  private dataSource = new Subject<string>();
  data$ = this.dataSource.asObservable();
  private ngUnsubscribe: Subject<any> = new Subject();

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
    if (this.path) {
      const token: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
      token.components.forEach(component => {
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
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(this.componentHost, component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        if (component.width) {
          childComponent.instance.width = component.width;
        }
        // todo: this is updating all previous fields each time a new response comes in
        // todo: figure out how to unsubscribe when all fields are filled
        this.data$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(res => {
          this.data = res;
          childComponent.instance.data = this.pick(this.data, keys);
        });
      });
    }
  }

  setData(data: any): void {
    this.data = data;
    this.dataSource.next(data);
  }

   pick(o, props) {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
