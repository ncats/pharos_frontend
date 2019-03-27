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
  rawData: any = {};
  description: string;
  sources: any = [];
  selectedArticle: string;

  constructor(
    private helpDataService: HelpDataService,
    private componentInjectorService: ComponentInjectorService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    console.log(this);
    this.helpDataService.data$.subscribe(res => {
      console.log(res);
     // this.rawData = res;
    });
    this.helpDataService.sources$.subscribe(res => {
      console.log(res);
      if(res && res.length) {
        this.sources = res;
        this.sources.forEach(source => {
          console.log(source);
          console.log(this.helpDataService.data);
          console.log(this.helpDataService.data[source.field]);
          this.rawData[source.field] = this.helpDataService.data[source.field];
        });
      }
    });
  }

  search() {}

  getLabel() {
    return this.helpDataService.label;
  }

  showArticle(source: any) {
    console.log(source);
    if (source.article) {
      this.selectedArticle = source.label;
      const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(source.article);
      const dynamicComponent: any = this.componentInjectorService.injectComponent(this.componentHost, dynamicChildToken);
/*      dynamicComponent.instance.target = this.target;
      dynamicComponent.instance.id = this.target.id;
      dynamicComponent.instance.path = this.path;*/
      this.ref.markForCheck(); // refresh the component manually
    }
  }

}
