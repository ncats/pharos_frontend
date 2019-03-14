import {ChangeDetectorRef, Component, ElementRef, OnInit, Type, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';
import {ComponentInjectorService} from "../../pharos-services/component-injector.service";
import {CustomContentDirective} from "../custom-content.directive";

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent implements OnInit {

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  searchCtrl: FormControl = new FormControl();
  rawData: any;
  description: string;
  sources: any;

  constructor(
    private helpDataService: HelpDataService,
    private componentInjectorService: ComponentInjectorService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    console.log(this);
    this.helpDataService.data$.subscribe(res => this.rawData = res);
    this.helpDataService.sources$.subscribe(res => this.sources = res);
   console.log(this.helpDataService.getSources(this.helpDataService.label));

  }

  search() {}

  getLabel() {
    return this.helpDataService.label;
  }

  showArticle(source: any) {
    console.log(source);
    if (source.article) {
      const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(source.article);
      console.log(dynamicChildToken);
      const dynamicComponent: any = this.componentInjectorService.injectComponent(this.componentHost, dynamicChildToken);
/*      dynamicComponent.instance.target = this.target;
      dynamicComponent.instance.id = this.target.id;
      dynamicComponent.instance.path = this.path;*/
      this.ref.markForCheck(); // refresh the component manually
    }
  }

}
