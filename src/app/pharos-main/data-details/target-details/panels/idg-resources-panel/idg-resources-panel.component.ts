import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../models/target';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {IDGResourceSerializer} from '../../../../../models/idg-resources/resource-serializer';
import {DataResource} from '../../../../../models/idg-resources/data-resource';
import {Reagent} from '../../../../../models/idg-resources/reagent';
import {PageData} from "../../../../../models/page-data";

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

  /**
   * Serializer to parse API results into Resource objects
   */
  resourceSerializer: IDGResourceSerializer<DataResource | Reagent> = new IDGResourceSerializer<DataResource | Reagent>();

  /**
   * List of all reagents to show in the panel
   */
  reagents: Reagent[] = [] ;
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
   * @param {HttpClient} http
   * @param {NavSectionsService} navSectionsService
   * @param pharosConfig
   */
  constructor(
    private http: HttpClient,
    private navSectionsService: NavSectionsService,
    private pharosConfig: PharosConfig) {
    super();
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
          this.loading = true;
          //this.fetchTestData(); return;
          this.http.get<any>(`https://rss.ccs.miami.edu/rss-api/target/search?term=${this.target.gene}`).subscribe(resourceList => {
            if (resourceList && resourceList.data) {
              resourceList.data.forEach(resourceMetadata => {
                if (resourceMetadata.id && resourceMetadata.name) {
                  this.fetchResourceDetails(resourceMetadata);
                }
              });
              this.loading = false;
            } else {
              this.navSectionsService.removeSection(this.field);
              this.selfDestruct.next('true');
            }
          });
        }
      );
  }

  /**
   * testing code to show all types of resources on a target details page. uncomment call to fetchTestData above.
   */
  private fetchTestData(){
    const testData = [
      {resourceType: 'Cell', id: '2786292a-51d0-4d81-90dc-7a605569bcc2', target: 'CLCN6', name: 'IDG-HEK293T-CLCN6-V5-OE'},
      {resourceType: 'Cell', id: 'd5774cdd-ced3-4dfd-8339-c0322c6dd3b0', target: 'CHRNA2', name: 'IDG-HEK293T-CHRNA2-V5-OE'},
      {resourceType: 'Chemical Tool', id: 'de219ecf-81d1-4b74-9666-c454f44c82a6', target: 'HIPK4', name: 'PA-16-0081C'},
      {resourceType: 'Chemical Tool', id: '92192412-263c-48b8-a670-26ca94e2cb5c', target: 'MKNK2', name: 'UNC-BE1-004'},
      {resourceType: 'Expression', id: 'd462e644-289d-4dce-9411-e92d80e2f97d', target: 'KCNA6', name: 'Expression ofKcna6 in Dorsal Root Ganglion'},
      {resourceType: 'Expression', id: '04c8a1cf-c289-45d0-9a43-399c8da13fc3', target: 'TMC7', name: 'Expression ofTmc7 in Dorsal Root Ganglion'},
      {resourceType: 'Genetic Construct', id: 'e7425931-114d-4c4e-9e7c-d58fa1e61a90', target: 'PKD2L2', name: 'IDG_PKD2L2_OE_1'},
      {resourceType: 'Genetic Construct', id: 'ae18e8c0-f24f-4cb9-af29-4188022c330c', target: 'KCNIP1', name: 'IDG_KCNIP1_OE_1'},
      {resourceType: 'GPCR Mouse Imaging', id: 'f0eb8b4d-a875-4851-8e3f-01b20a93c61e', target: 'GPR85', name: 'FLAG-GPR85-IRES-CRExAi9_spleen_male'},
      {resourceType: 'GPCR Mouse Imaging', id: '3fc152ee-a52f-4dd4-8973-ccc0c6a7633b', target: 'TAS2R4', name: 'FLAG-TAS2R4-IRES-CRExAi9_Brain_male'},
      {resourceType: 'Mouse', id: '5730f6da-3fb8-4bda-a781-5515c8019a26', target: 'GPR68', name: 'C57BL/6J-Gpr68em1(cre)Blr/Mmnc'},
      {resourceType: 'Mouse', id: '8b1fe4a5-6e4b-41e0-94d7-90184dd092b8', target: 'GPR85', name: 'C57BL/6J-Gpr85em1(Gpr85*,cre)Blr/Mmnc'},
      {resourceType: 'Mouse phenotype data', id: 'e763807c-1868-4267-aa19-0519f95da7e4', target: 'KCNAB3', name: 'Phenotype of Kcnab3 knockout mice from International Mouse Phenotype Consortium'},
      {resourceType: 'Mouse phenotype data', id: '8febf7dc-941e-4ed2-95db-e61f4a7cc9f3', target: 'KCNIP4', name: 'Phenotype of Kcnip4 knockout mice from International Mouse Phenotype Consortium'},
      {resourceType: 'NanoBRET',id: 'f0b127a3-1a74-4b27-9336-7086831881df', target: 'BRSK2', name: 'NanoLuc®-BRSK2'},
      {resourceType: 'NanoBRET',id: '38076d76-02ec-4d03-88e9-c15020021e77', target: 'DCLK3', name: 'NanoLuc®-fused DCLK3'},
      {resourceType: 'Peptide', id: 'd6507f40-c1c4-4134-a699-d7c7ce862940', target: 'SCYL2', name: 'SCYL2-LGSSSLTNIPEEVR'},
      {resourceType: 'Peptide', id: '6c364c55-48c4-4718-86fa-899665868f7e', target: 'TLK2', name: 'TLK2-ISALENSK'}
      ];
      for(let testmetadata of testData){
        this.fetchResourceDetails(testmetadata);
      }
      this.loading = false;
  }

  /**
   * Helper function for fetching one resource's details from the server
   */
  private fetchResourceDetails(resourceMetadata) {
    this.http.get<any>(`https://rss.ccs.miami.edu/rss-api/target/id?id=${resourceMetadata.id}&json=true`)
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
  active(fragment: string)
  {
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
    this.dataResources.push(newElement);
    this.dataResourcePageData = this.makePageData(this.dataResources.length);
    this.dataResourceList = this.dataResources;
    this.dataResourcesUpdated.next();
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
