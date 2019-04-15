import {
  ChangeDetectorRef, Component, ElementRef, Injector, OnInit, QueryList, Type, ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';
import {ComponentInjectorService} from "../../pharos-services/component-injector.service";
import {CustomContentDirective} from "../custom-content.directive";
import {CdkPortal, CdkPortalOutlet, ComponentPortal, Portal} from "@angular/cdk/portal";

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent implements OnInit {
  @ViewChildren('HelpArticleOutlet', {read: ViewContainerRef}) articleOutlet: QueryList<ViewContainerRef>;
  @ViewChildren(CdkPortalOutlet) articlePortalOutlets: QueryList<CdkPortalOutlet>;
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  searchCtrl: FormControl = new FormControl();
  rawData: any = {};
  description: string;
  title: string;
  sources: any[] = [];
  selectedArticle: string;
  opened: boolean[] = [];

  constructor(private helpDataService: HelpDataService,
              private componentInjectorService: ComponentInjectorService,
              private ref: ChangeDetectorRef,
              private _injector: Injector) {
  }

  ngOnInit() {
    this.helpDataService.sources$.subscribe(res => {
      if (res) {
        this.sources = res.sources;
        this.description = res.mainDescription;
        this.title = res.title;
        if (this.sources && this.sources.length) {
          this.sources.forEach(source => {
            this.rawData[source.field] = this.helpDataService.data[source.field];
          });
        }
      }
    });
  }

  search() {
  }

  getLabel() {
    return this.helpDataService.label;
  }

  showArticle(source: any, index: number) {
    if (source.article) {
      this.opened[index] = true;
      this.selectedArticle = source.label;
      if (this.articleOutlet) {
          const comp = this._injector.get<Type<any>>(source.article);
          const outlet = this.articlePortalOutlets.toArray()[index];
          const compPortal = new ComponentPortal(comp);
           outlet.attach(compPortal);
      }
    }
  }

  closeArticle(index: number) {
    this.opened[index] = false;
    const outlet = this.articlePortalOutlets.toArray()[index];
    outlet.detach();
  }
}
