import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {Target} from '../../../../../models/target';
import {IDGResourceSerializer} from '../../../../../models/idg-resources/resource-serializer';
import {DataResource, MouseImageData} from '../../../../../models/idg-resources/data-resource';
import {Reagent} from '../../../../../models/idg-resources/reagent';
import {PageData} from '../../../../../models/page-data';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltip} from '@angular/material/tooltip';
import {MouseExpressionComponent} from './mouse-expression/mouse-expression.component';
import {ReagentPanelComponent} from './reagent-panel/reagent-panel.component';
import {ListFilterComponent} from '../../../../../tools/list-filter/list-filter.component';
import {DataResourcePanelComponent} from './data-resource-panel/data-resource-panel.component';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * panel to show idg generated resources
 */
@Component({
  standalone: true,
  imports: [
    ScrollspyDirective, MatCardModule, MouseExpressionComponent, ReagentPanelComponent, FlexLayoutModule,
    CommonModule, ComponentHeaderComponent, MatTabsModule, MatTooltip, ListFilterComponent, DataResourcePanelComponent
  ],
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss', './reagent-panel/reagent-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() target: Target;

  /**
   * Serializer to parse API results into Resource objects
   */
  resourceSerializer: IDGResourceSerializer<DataResource | Reagent> = new IDGResourceSerializer<DataResource | Reagent>();

  mouseExpressions: DataResource[] = [];
  mouseExpressionsUpdated: Subject<void> = new Subject<void>();
  /**
   * List of all reagents to show in the panel
   */
  reagents: Reagent[] = [];
  /**
   * List of reagents currently shown in the panel, subject to filters and paging
   */
  reagentsList: Reagent[] = [];
  /**
   * PageData object sent to the filter
   */
  reagentPageData: PageData;
  /**
   * Subject to send updates to the filter for changes to the list of reagents, since they come in from the API individually
   */
  reagentsUpdated: Subject<void> = new Subject<void>();

  /**
   * List of all dataResources to show in the panel
   */
  dataResources: DataResource[] = [];

  /**
   * List of dataResources currently shown in the panel, subject to filtering and paging
   */
  dataResourceList: DataResource[] = [];
  dataResourcePageData: PageData;
  dataResourcesUpdated: Subject<void> = new Subject<void>();

  /**
   * set up nav sections
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: any,
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  /**
   * subscribe to data changes
   * initialize filter subscriptions
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.target = this.data.targets;
        this.loadingStart();
        this.dataResources = [];
        this.reagents = [];
        this.mouseExpressions = [];

        try {
          if (this.target?.drgcResources.length > 0) {
            this.showSection();
            this.target.drgcResources.forEach(resource => {
              const resc = this.resourceSerializer.fromJson(resource.apiResult, resource.resourceType);
              if (resc instanceof Reagent) {
                this.updateReagentLists(resc);
              } else if (resc instanceof DataResource) {
                this.updateDataResourceLists(resc);
              }
            });
            this.changeRef.detectChanges();
          } else {
            this.hideSection();
          }
        }
        catch (e){
          console.log(e);
        }
        this.loadingComplete();
      });
  }

  /**
   * update the DataResource lists with the new element, notify filter
   * @param newElement
   */
  private updateDataResourceLists(newElement) {
    if (newElement instanceof MouseImageData) {
      this.mouseExpressions.push(newElement);
      this.mouseExpressionsUpdated.next();
    } else {
      this.dataResources.push(newElement);
      this.dataResourcePageData = this.makePageData(this.dataResources.length);
      this.dataResourceList = this.dataResources;
      this.dataResourcesUpdated.next();
    }
  }

  /**
   * update the Resource lists with the new element, notify filter
   * @param newElement
   */
  private updateReagentLists(newElement) {
    this.reagents.push(newElement);
    this.reagentPageData = this.makePageData(this.reagents.length);
    this.reagentsList = this.reagents;
    this.reagentsUpdated.next();
  }
}
