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
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";

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

  constructor(
    //private componentInjectorService: ,
           @Inject(ComponentInjectorService) private componentInjectorService
  ) { }

  ngOnInit() {
    console.log(this);
      this.target = this.data.content;
      this.references = this.data.references;
/*      const dynamicComponent = this.componentInjectorService.injectComponent(this.componentHost, COMPONENTS.get(this.target.idgTDL.toLowerCase()))
    dynamicComponent.instance.target = this.target;*/
  }

  fetchData(){
    if(this.target._publications.count > 0) {
   //   this.dataDetailsResolver.getDetailsByUrl(this.target._publications, 'references');
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
