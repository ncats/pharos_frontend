import {Component, Injector, OnInit, QueryList, Type, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent implements OnInit {

  /**
   * list of possible help article injection sites
   */
  @ViewChildren(CdkPortalOutlet) articlePortalOutlets: QueryList<CdkPortalOutlet>;

  /**
   * controller to search the help panel
   * todo: currently not too useful, as the help articles and definitions are loaded on demand.
   * @type {FormControl}
   */
  searchCtrl: FormControl = new FormControl();

  /**
   * helper object to hold the raw data for the view panel
   * @type {{}}
   */
  rawData: any = {};

  /**
   * main help section description
   */
  description: string;

  /**
   * title for help section
   */
  title: string;

  /**
   * sprovenance sources.
   * todo: currently not used
   * @type {any[]}
   */
  sources: any[] = [];

  /**
   * specific injected article that has been selected
   */
  selectedArticle: string;

  /**
   * array to track the status of each possible injected article from the cdkportals query list
   * @type {any[]}
   */
  opened: boolean[] = [];

  /**
   * initialize data retrieval and component injection services
   * @param {HelpDataService} helpDataService
   * @param {ComponentInjectorService} componentInjectorService
   * @param {Injector} _injector
   */
  constructor(private helpDataService: HelpDataService,
              private componentInjectorService: ComponentInjectorService,
              private _injector: Injector) {
  }

  /**
   * subscribe to dat asource changes and parse data object
   */
  ngOnInit() {
    console.log(this);
    this.helpDataService.sources$.subscribe(res => {
      console.log(res);
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

  /**
   * stub to handle help section search
   */
  search() {
  }

  /**
   * get readable lable for section
   * @returns {string}
   */
  getLabel() {
    return this.helpDataService.label;
  }

  /**
   * fetch and inject help articles in cdkportal
   * @param source
   * @param {number} index
   */
  showArticle(source: any, index: number) {
    if (source.article) {
      this.opened[index] = true;
      this.selectedArticle = source.label;
      if (this.articlePortalOutlets) {
          const comp = this._injector.get<Type<any>>(source.article);
          const outlet = this.articlePortalOutlets.toArray()[index];
          const compPortal = new ComponentPortal(comp);
           outlet.attach(compPortal);
      }
    }
  }

  /**
   * close and detach article
   * @param {number} index
   */
  closeArticle(index: number) {
    this.opened[index] = false;
    const outlet = this.articlePortalOutlets.toArray()[index];
    outlet.detach();
  }
}
