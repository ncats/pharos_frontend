import {
  Component, ComponentFactoryResolver, forwardRef, Inject, InjectionToken, Injector, Input, OnInit, Type,
  ViewChild
} from '@angular/core';
import {Target} from "../../../models/target";
import {CustomContentDirective} from "../../../tools/custom-content.directive";
import {Publication} from "../../../models/publication";
import {PharosApiService} from "../../../pharos-services/pharos-api.service";
import {DataDetailsResolver} from "../../services/data-details.resolver";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";

const componentLookupServiceToken = new InjectionToken('TdarkViewerComponent');

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css'],

})

export class TargetDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() path: string;
  target: Target;
  references: Publication[];
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(componentLookupServiceToken) private componentLookupService,
    private componentInjectorService: ComponentInjectorService,
  ) {
    console.log(this);
    console.log(componentLookupServiceToken)
  }

  ngOnInit() {
    console.log(this);
    console.log(componentLookupServiceToken)
      this.target = this.data.content;
      this.references = this.data.references;
     // const componentLookup = this._injector.get(componentLookupServiceToken);

    //  console.log(componentLookup);
    const dynamicComponent: any = this.componentInjectorService.injectComponent(this.componentHost, this.componentLookupService);
    dynamicComponent.instance.target = this.target;
  }

  fetchData(){
    if(this.target._publications.count > 0) {
   //   this.dataDetailsResolver.getDetailsByUrl(this.target._publications, 'references');
    }
  }
}
