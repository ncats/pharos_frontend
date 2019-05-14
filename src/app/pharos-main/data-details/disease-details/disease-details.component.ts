import {ChangeDetectorRef, Component, Inject, Injector, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DataDetailsResolver} from '../data-details.resolver';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {takeUntil} from 'rxjs/operators';
import {Disease} from '../../../models/disease';
import {HelpDataService} from '../../../tools/help-panel/services/help-data.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {NavSectionsService} from '../../../tools/sidenav-panel/services/nav-sections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PharosConfig} from "../../../../config/pharos-config";

/**
 * main component to display disease detail panels
 */
@Component({
  selector: 'pharos-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * main path
   * todo - this could be hardcoded as 'target', since it is
   */
  @Input() path: string;

  /**
   * array of all navigation sections
   * @type {any[]}
   */
  sections: string[] = [];

  /**
   * disease object displayed
   */
  @Input()   disease: Disease;

  /**
   * div element all panels are injected into
   */
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;

  /**
   * currently active element
   */
  activeElement: string;

  /**
   * set up lots of dependencies to watch for data changes, navigate and parse and inject components
   * @param {Injector} _injector
   * @param {Document} document
   * @param {DataDetailsResolver} dataDetailsResolver
   * @param {PharosConfig} pharosConfig
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {NavSectionsService} navSectionsService
   * @param {ChangeDetectorRef} changeDetector
   * @param {HelpDataService} helpDataService
   * @param {BreakpointObserver} breakpointObserver
   * @param {ComponentInjectorService} componentInjectorService
   */
  constructor(
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private dataDetailsResolver: DataDetailsResolver,
    private pharosConfig: PharosConfig,
    private router: Router,
    private route: ActivatedRoute,
    private navSectionsService: NavSectionsService,
    private changeDetector: ChangeDetectorRef,
    private helpDataService: HelpDataService,
    public breakpointObserver: BreakpointObserver,
    private componentInjectorService: ComponentInjectorService
  ) {
    super();
  }

  /**
   * fetch components for a specific object type.
   * iterate over each component and call all apis listed
   * each api field is added to a tracking array
   * each section is added to the navigation sidebar
   * the component is dynamically generated and injected into the dom
   * the pharos object and pharos object id are injected into the dynamic component
   * the main path is injected into the component
   * the main data change subscription is watch, and on each change, the returned object is parsed to fetch
   * each field in the helper array
   * this data object is then injected into the dynamic component
   * todo this doesn't handle cases where there is no data returned to an object
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    const components: any = this.pharosConfig.getComponents(this.path, 'panels');
    if (components) {
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        component.api.forEach(apiCall => {
          if (apiCall.url && apiCall.url.length > 0) {
            const url = apiCall.url.replace('_id_', this.disease.id);
            /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
            this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);

            /** this will be used to track the object fields to get */
            keys.push(apiCall.field);
          }
        });
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        if (component.navHeader) {
          this.sections.push(component.navHeader);
          this.navSectionsService.setSections(Array.from(new Set([...this.sections])));
          this.helpDataService.setSources(component.navHeader.section,
            {
              sources: component.api,
              title: component.navHeader.label,
              mainDescription: component.navHeader.mainDescription ? component.navHeader.mainDescription : null
            }
          );
          childComponent.instance.field = component.navHeader.section;
          childComponent.instance.label = component.navHeader.label;
        }

        // todo need to cover when no results are returned - do we still want to make the component?
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(obj => {
            childComponent.instance.disease = this.disease;
            childComponent.instance.id = this.disease.id;
            const dataObject = this.pick(obj, keys);
            if (!Object.values(dataObject).includes(undefined)) {
              childComponent.instance.data = dataObject;
            }
          });
      });
    }
  }

  /**
   * select specific properties from data object
   * @param o
   * @param props
   * @returns {any}
   */
  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  /**
   * clean up on exit
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
