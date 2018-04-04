import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Target} from "../../../models/target";
import {TargetTableComponent} from "../../data-list/target-table/target-table.component";
import {TdarkViewerComponent} from "./tdark-viewer/tdark-viewer.component";
import {TbioViewerComponent} from "./tbio-viewer/tbio-viewer.component";
import {TchemViewerComponent} from "./tchem-viewer/tchem-viewer.component";
import {TclinViewerComponent} from "./tclin-viewer/tclin-viewer.component";
import {CustomContentDirective} from "../../../tools/custom-content.directive";

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']
})
export class TargetDetailsComponent implements OnInit {
  @Input() target: Target;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
      const instance: Type<any> = COMPONENTS.get(this.target.idgTDL.toLowerCase());
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(instance);
      const viewContainerRef = this.componentHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.target = this.target;

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
