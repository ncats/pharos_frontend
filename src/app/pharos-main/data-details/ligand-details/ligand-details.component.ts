import {
  ChangeDetectorRef, Component, forwardRef, Inject, Injector, Input, OnDestroy, OnInit, Type,
  ViewChild
} from '@angular/core';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {takeUntil} from 'rxjs/operators';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../models/ligand';
import {HelpDataService} from '../../../tools/help-panel/services/help-data.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {NavSectionsService} from '../../../tools/sidenav-panel/services/nav-sections.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'pharos-ligand-details',
  templateUrl: './ligand-details.component.html',
  styleUrls: ['./ligand-details.component.css']
})
export class LigandDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  @Input() path: string;
  token: any;
  sections: string[] = [];
  navIsFixed = false;
  activeElement = 'summary';

  ligand: Ligand;

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
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

  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    const components: any = this.componentLookupService.lookupByPath(this.path, 'panels');
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
            childComponent.instance.ligand = this.ligand;
            childComponent.instance.id = this.ligand.id;
            const dataObject = this.pick(obj, keys);
            if (!Object.values(dataObject).includes(undefined)) {
              childComponent.instance.data = dataObject;
            }
          });
      });
    }
  }

  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
