import {Component, ComponentFactoryResolver, Inject, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Target} from "../../../models/target";
import {TdarkViewerComponent} from "./tdark-viewer/tdark-viewer.component";
import {TbioViewerComponent} from "./tbio-viewer/tbio-viewer.component";
import {TchemViewerComponent} from "./tchem-viewer/tchem-viewer.component";
import {TclinViewerComponent} from "./tclin-viewer/tclin-viewer.component";
import {CustomContentDirective} from "../../../tools/custom-content.directive";
import {Publication} from "../../../models/publication";
import {PharosApiService} from "../../../pharos-services/pharos-api.service";
import {DataDetailsResolver} from "../../services/data-details.resolver";

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']
})
export class TargetDetailsComponent implements OnInit {
  @Input() data: any;
  target: Target;
  references: Publication[];
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
            private dataDetailsResolver: DataDetailsResolver) { }

  ngOnInit() {
    console.log(this);
      this.target = this.data.target;
      this.references = this.data.references;
      const instance: Type<any> = COMPONENTS.get(this.target.idgTDL.toLowerCase());
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(instance);
      const viewContainerRef = this.componentHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.target = this.target;

  }

  fetchData(){
    if(this.target._publications.count > 0) {
      this.dataDetailsResolver.getDetailsByUrl(this.target._publications, 'references');
    }
  }
}


const COMPONENTS: Map<string, any> = new Map<string, any>(
  [
    ['tdark', TdarkViewerComponent],
    ['tbio', TbioViewerComponent],
    ['tchem', TchemViewerComponent],
    ['tclin', TclinViewerComponent]
  ]
);
