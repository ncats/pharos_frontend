import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {PageEvent} from "@angular/material/paginator";
import {LigandSerializer} from "../../../../../models/ligand";
import {TargetComponents} from "../../../../../models/target-components";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {PharosApiService} from "../../../../../pharos-services/pharos-api.service";
import {PharosConfig} from "../../../../../../config/pharos-config";
import {BehaviorSubject} from "rxjs";
import {Target} from "../../../../../models/target";
import {Facet} from "../../../../../models/facet";
import {takeUntil} from "rxjs/operators";
import {PageData} from "../../../../../models/page-data";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'pharos-drugs-ligands-panel',
  templateUrl: './drugs-ligands-panel.component.html',
  styleUrls: ['./drugs-ligands-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrugsLigandsPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * target object
   */
  @Input() target: Target;

  params: DrugPanelParameters;

  /**
   * reference to Facet class for use in the html
   */
  Facet = Facet;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private pharosConfig: PharosConfig,
    public breakpointObserver: BreakpointObserver,
    public navSectionsService: NavSectionsService) {
  super(navSectionsService);
  }

  /**
   * subscribe to data changes and set data when it arrives
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target[this.params.fieldName]) {
          if (this.target[this.params.fieldName].length === 0) {
            this.navSectionsService.hideSection(this.field);
          }
          else{
            this.navSectionsService.showSection(this.field);
          }
        }

        this.pageData = new PageData({
          total: this.target[this.params.countName],
          skip: 0,
          top: 10
        });
        this.changeRef.markForCheck();
        this.loadingComplete();
      });
  }

  pageData: PageData;

  /**
   * paginate ligand list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loadingStart();
    const ligandSerializer = new LigandSerializer();
    let pageParams = {};
    this.pageData.skip = event.pageIndex * event.pageSize;
    pageParams[this.params.topParam] = event.pageSize;
    pageParams[this.params.skipParam] = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, this.params.componentName).subscribe(res => {
      this.target[this.params.fieldName] = res.data.targets[this.params.fieldName].map(lig => ligandSerializer.fromJson(lig));
      this.loadingComplete();
      this.changeRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

export class DrugPanelParameters{
  fieldName = 'drugs';
  countName = 'drugCount';
  topParam = 'drugstop';
  skipParam = 'drugsskip'
  componentName = TargetComponents.Component.Drugs;
  buttonText = 'Explore Approved Drugs';
  buttonFilter = 'Drug';

  constructor(isDrug: boolean = true) {
    if (!isDrug){
      this.fieldName = 'ligands';
      this.countName = 'ligandCount';
      this.topParam = 'ligandstop';
      this.skipParam = 'ligandsskip';
      this.componentName = TargetComponents.Component.Ligands;
      this.buttonText = 'Explore Active Ligands';
      this.buttonFilter = 'Ligand';
    }
  }
}
