import {Component, EventEmitter, Injector, OnDestroy, OnInit, Output, QueryList, Type, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {PanelOptions} from '../../pharos-main/pharos-main.component';
import {ActivatedRoute} from '@angular/router';
import {HelpPanelOpenerService} from './services/help-panel-opener.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  panelOptions: PanelOptions = {
    mode : 'over',
    class : 'filters-panel',
    opened: false,
    fixedInViewport: true,
    fixedTopGap: 118,
    role: 'directory'
    /* [mode]="isSmallScreen!==true ? 'side' : 'over'"
     [opened]="isSmallScreen !== true"*/
  };

  /**
   * close the help panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

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
  mainSource: string[];

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
   * initialize data retrieval and component injection services
   * @param {HelpDataService} helpDataService
   * @param helpPanelOpenerService
   * @param _route
   * @param {ComponentInjectorService} componentInjectorService
   * @param {Injector} _injector
   */
  constructor(
    public helpDataService: HelpDataService,
    private helpPanelOpenerService: HelpPanelOpenerService,
    private _route: ActivatedRoute,
    private _injector: Injector) {
  }

  /**
   * specific injected article that has been selected
   */
  selectedArticle: string;

  /**
   * array to track the status of each possible injected article from the cdkportals query list
   * @type {any[]}
   */
  opened: boolean[] = [];

  loading = true;
  /**
   * subscribe to dat asource changes and parse data object
   */
  ngOnInit() {
    this._route.snapshot.data.components
      .forEach((component: any) => {
        this.addSource(component);
        if (component.panels && component.panels.length > 0) {
          component.panels.forEach(subComponent => {
            this.addSource(subComponent);
          });
        }
      });

    this.helpDataService.sources$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      if (res) {
        this.sources = res.sources;
        this.description = res.mainDescription;
        this.mainSource = this.getMainSource(res.mainSource);
        this.title = res.title;
        if (this.sources && this.sources.length) {
          this.sources.forEach(source => {
          //  this.rawData[source.field] = this.helpDataService.data[source.field];
          });
        }
      }
    });

    this.helpPanelOpenerService.toggle$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.toggleMenu(!this.loading));
    this.loading = false;
  }

  private addSource(component) {
    if (component.navHeader) {
      this.helpDataService.setSources(component.navHeader.section,
        {
          sources: component.api,
          title: component.navHeader.label,
          mainDescription: component.navHeader.mainDescription || null,
          mainSource: this.getMainSource(component.navHeader.mainSource)
        });
    }
  }

  getMainSource(inputSource): string[]{
    let mainSource;
    if (inputSource) {
      if (Array.isArray(inputSource)){
        mainSource = inputSource;
      }else{
        mainSource = [inputSource];
      }
    }
    return mainSource;
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

  /**
   * close the help panel
   */
  toggleMenu(force?: boolean) {
    this.menuToggle.emit(force);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
