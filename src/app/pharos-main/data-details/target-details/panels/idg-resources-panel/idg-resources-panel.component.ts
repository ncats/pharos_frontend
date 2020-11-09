import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../models/target';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {IDGResourceSerializer} from '../../../../../models/idg-resources/resource-serializer';
import {DataResource, MouseImageData} from '../../../../../models/idg-resources/data-resource';
import {Reagent} from '../../../../../models/idg-resources/reagent';
import {PageData} from "../../../../../models/page-data";
import {MatTabGroup} from "@angular/material/tabs";
import {isPlatformBrowser} from "@angular/common";

/**
 * panel to show idg generated resources
 */
@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss', './reagent-panel/reagent-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() target: Target;

  @ViewChild('tabs') tabGroup: MatTabGroup;
  /**
   * Serializer to parse API results into Resource objects
   */
  resourceSerializer: IDGResourceSerializer<DataResource | Reagent> = new IDGResourceSerializer<DataResource | Reagent>();

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

  mouseExpressions: DataResource[] = [];
  mouseExpressionsUpdated: Subject<void> = new Subject<void>();
  /**
   * List of dataResources currently shown in the panel, subject to filtering and paging
   */
  dataResourceList: DataResource[] = [];
  dataResourcePageData: PageData;
  dataResourcesUpdated: Subject<void> = new Subject<void>();

  /**
   * set up nav sections
   * @param {HttpClient} http
   * @param {NavSectionsService} navSectionsService
   * @param pharosConfig
   */
  constructor(
    private http: HttpClient,
    private pharosConfig: PharosConfig,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: Object,
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  /**
   * subscribe to data changes
   * initialize filter subscriptions
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
          this.target = this.data.targets;
          this.loadingStart();
          this.dataResources = [];
          this.reagents = [];
          this.mouseExpressions = [];
          if (isPlatformBrowser(this.platformID)) {
            this.http.get<any>(`https://rss.ccs.miami.edu/rss-api/target/search?term=${this.target.gene}&pharosReady=true`).subscribe(resourceList => {
              if (resourceList && resourceList.data && resourceList.data.length) {
                resourceList.data.forEach(resourceMetadata => {
                  if (resourceMetadata.id && resourceMetadata.name) {
                    this.fetchResourceDetails(resourceMetadata);
                  }
                });
                this.navSectionsService.showSection(this.field);
              } else {
                this.navSectionsService.hideSection(this.field);
              }
              this.changeRef.markForCheck();
              this.loadingComplete();
            });
          }
          else{
            this.navSectionsService.hideSection(this.field);
          }
        }
      );
  }

  /**
   * Helper function for fetching one resource's details from the server
   */
  private fetchResourceDetails(resourceMetadata) {
    this.http.get<any>(`https://rss.ccs.miami.edu/rss-api/target/id?id=${resourceMetadata.id}&json=true&pharosReady=true`)
      .subscribe({
        next: resource => {
          const resc = this.resourceSerializer.fromJson(resource.data[0], resourceMetadata.name, resourceMetadata.resourceType);
          if (resc instanceof Reagent) {
            this.updateReagentLists(resc);
          } else {
            this.updateDataResourceLists(resc);
          }
        }
      });
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._data.unsubscribe();
  }

  /**
   * update the DataResource lists with the new element, notify filter
   * @param newElement
   */
  private updateDataResourceLists(newElement) {
    if (newElement instanceof MouseImageData) {
      this.mouseExpressions.push(newElement);
      this.mouseExpressionsUpdated.next();
      if (this.tabGroup) {
        this.tabGroup.selectedIndex = 2;
      }
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
