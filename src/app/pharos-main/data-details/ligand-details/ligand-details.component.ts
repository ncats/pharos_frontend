import {ChangeDetectorRef, Component, Inject, Injector, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {map, takeLast, takeUntil, takeWhile} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../models/ligand';
import {HelpDataService} from '../../../tools/help-panel/services/help-data.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {NavSectionsService} from '../../../tools/sidenav-panel/services/nav-sections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PharosConfig} from '../../../../config/pharos-config';

/**
 * main component to display ligand details panels
 */
@Component({
  selector: 'pharos-ligand-details',
  templateUrl: './ligand-details.component.html',
  styleUrls: ['./ligand-details.component.scss']
})
export class LigandDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * main path
   */
  @Input() path: string;

  /**
   * array of all navigation sections
   * @type {any[]}
   */
  sections: string[] = [];

  /**
   * target being displayed
   */
  @Input() ligand: Ligand;

  /**
   * div element all components are injected into
   */
  @ViewChild(CustomContentDirective, {static: true}) componentHost: CustomContentDirective;


  /**
   * set up lots of dependencies to watch for data changes, navigate and parse and inject components
   * @param {Injector} _injector
   * @param {Document} document
   * @param {DataDetailsResolver} dataDetailsResolver
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {NavSectionsService} navSectionsService
   * @param {ChangeDetectorRef} changeDetector
   * @param {PharosConfig} pharosConfig
   * @param {HelpDataService} helpDataService
   * @param {BreakpointObserver} breakpointObserver
   * @param {ComponentInjectorService} componentInjectorService
   */
  constructor(private _injector: Injector,
              @Inject(DOCUMENT) private document: Document,
              private dataDetailsResolver: DataDetailsResolver,
              private router: Router,
              private route: ActivatedRoute,
              private navSectionsService: NavSectionsService,
              private changeDetector: ChangeDetectorRef,
              private pharosConfig: PharosConfig,
              private helpDataService: HelpDataService,
              public breakpointObserver: BreakpointObserver,
              private componentInjectorService: ComponentInjectorService) {
    super();
  }

  /**
   * fetch components for a specific object type.
   * iterate over each component and call all apis listed
   * each api field is added to a tracking array
   *    * each section is added to the navigation sidebar
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
            const url = apiCall.url.replace('_id_', this.ligand.id);
            /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
            this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);
            /** this will be used to track the object fields to get */
            keys.push(apiCall.field);
          }
        });
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);
        childComponent.instance.disease = this.ligand;
        childComponent.instance.id = this.ligand.id;

        if (component.navHeader) {
          this.sections.push(component.navHeader);
          this.helpDataService.setSources(component.navHeader.section,
            {
              sources: component.api,
              title: component.navHeader.label,
              mainDescription: component.navHeader.mainDescription ? component.navHeader.mainDescription : null
            }
          );
          childComponent.instance.description = component.navHeader.mainDescription;
          childComponent.instance.apiSources = component.api;
          childComponent.instance.field = component.navHeader.section;
          childComponent.instance.label = component.navHeader.label;
        }

        this._data
          .pipe(
            map(res => this.pick(res, keys)),
            takeWhile(res => Object.values(res).includes(undefined), true),
            takeLast(1)
          )
          .subscribe(obj => {
            if (!Object.values(obj).includes(undefined)) {
              childComponent.instance.data = obj;
              let count = Object.values(obj).length;
              Object.values(obj).forEach(val => {
                if (val == 0) {
                  count--
                }
                else if (val === []) {
                  count--
                }
                else if (val['content'] && val['content'].length === 0) {
                  count--
                } // this one covers ppi section
              });
              if (count === 0 && component.navHeader) {
                // this.sections = this.sections.filter(section => section.section !== component.navHeader.section);
                // this.navSectionsService.setSections(this.sections);
                childComponent.destroy();
              }
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
