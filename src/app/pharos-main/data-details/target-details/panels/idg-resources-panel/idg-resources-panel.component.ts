import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import * as d3 from 'd3';
import {BehaviorSubject, from} from 'rxjs';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../models/target';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {IDGResourceSerializer} from '../../../../../models/idg-resources/resource-serializer';
import {DataResource} from '../../../../../models/idg-resources/data-resource';
import {Reagent} from '../../../../../models/idg-resources/reagent';

/**
 * panel to show idg generated resources. currently stub functionality
 */
@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input() target: Target;

resourceSerializer: IDGResourceSerializer<DataResource | Reagent> = new IDGResourceSerializer<DataResource | Reagent>();
  reagents = [];

  datasources = [];

  reagentsList = [];
  dataSourceList = [];

  reagentFilterCtrl: FormControl = new FormControl();
  dataFilterCtrl: FormControl = new FormControl();

reagentTypes: string[] = [];
dataTypes: string[] = [];


  /**
   * data to be shown
   */
  tableArr: any[] = [];

  /**
   * set up nav sections
   * @param {HttpClient} http
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    private http: HttpClient,
    private navSectionsService: NavSectionsService,
    private pharosConfig: PharosConfig
  ) {
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
        this.reagentTypes = [];
        this.dataTypes = [];
          this.target = this.data.targets;
          this.loading = false;
          this.http.get<any>(`http://dev3.ccs.miami.edu:8080/rss-api/target/search?term=${this.target.gene}`).subscribe(res => {
            if (res && res.data) {
              res.data.forEach(data => {
                this.http.get<any>(`http://dev3.ccs.miami.edu:8080/rss-api/target/id?id=${data.id}&json=true`).subscribe(resource => {
                  const resc = this.resourceSerializer.fromJson(resource.data[0], data.resourceType);
                  this[`${resc.baseType}s`].push(resc);
                });
              });
            } else {
              this.navSectionsService.removeSection(this.field);
              this.selfDestruct.next('true');
            }
          });
          // this.setterFunction();
      });

    this.reagentsList = this.reagents;
    this.dataSourceList = this.datasources;
    this.loading = false;


    this.reagentFilterCtrl.valueChanges.subscribe(change => {
      this.reagentsList = [];
      change.forEach(field => {
        this.reagentsList.push(...this.reagents.filter(reagent => reagent.resourceType === field));
      });
    });

    this.dataFilterCtrl.valueChanges.subscribe(change => {
      this.dataSourceList = [];
      change.forEach(field => {
        this.dataSourceList.push(...this.datasources.filter(reagent => reagent.resourceType === field));
      });
    });


    this.reagentTypes = Array.from(new Set(this.reagents.map(reagent => reagent.resourceType))).map(reagent => {
    const ret: any = {
      value: reagent,
      label: reagent.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
    };
    return ret;
  });

this.dataTypes = Array.from(new Set(this.datasources.map(reagent => reagent.resourceType))).map(reagent => {
    const ret: any = {
      value: reagent,
      label: reagent.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
    };
    return ret;
  });

this.pageData = this.makePageData(this.reagents.length);
  }

  /**
   * return thumbnail for resource type
   * @param type
   */
  getImageUrl(type: string): string {
    return `./assets/images/resource-type/${type}.png`;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  parseSmiles(smiles) {
    return `${this.pharosConfig.getApiPath()}render/${encodeURIComponent(smiles)}?size=250`;
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._data.unsubscribe();
  }
}
