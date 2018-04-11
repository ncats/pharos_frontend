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
import {ComponentLookupService} from "../../../pharos-services/component-lookup.service";

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
  dynamicComponent: any;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() =>ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {  }

  ngOnInit() {
    console.log(this);
      this.target = this.data.object;
      this.references = this.data.references;
      const token: any = this.componentLookupService.lookupByPath(this.path, this.target.idgTDL.toLowerCase());
      this.dynamicComponent = this.componentInjectorService.injectComponentToken(this.componentHost, token);
      this.dynamicComponent.instance.target = this.target;
      this.dynamicComponent.instance.references = this.references;
      this.fetchData();
  }

  setData(data: any): void {
    this.data = data;
    if(this.dynamicComponent){
    this.dynamicComponent.instance.target = this.data.object;
    this.dynamicComponent.instance.references = this.data.references;
      this.dynamicComponent.changeDetectorRef.detectChanges();
    }
  }

  fetchData(){
    if(this.target._publications.count > 0) {
      this.dataDetailsResolver.getDetailsByUrl(this.target._publications.href, 'references');
    }
  }
}
