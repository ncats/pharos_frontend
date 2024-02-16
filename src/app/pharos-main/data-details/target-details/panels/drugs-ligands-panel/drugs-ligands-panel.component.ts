import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {LigandSerializer} from '../../../../../models/ligand';
import {TargetComponents} from '../../../../../models/target-components';
import {ActivatedRoute} from '@angular/router';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {BehaviorSubject} from 'rxjs';
import {Target} from '../../../../../models/target';
import {Facet} from '../../../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../../models/page-data';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {CommonModule} from '@angular/common';
import {ExploreListButtonComponent} from '../../../../../tools/explore-list-button/explore-list-button.component';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: DrugsLigandsPanelComponent.imports,
  selector: 'pharos-drugs-ligands-panel',
  templateUrl: './drugs-ligands-panel.component.html',
  styleUrls: ['./drugs-ligands-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrugsLigandsPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  static imports = [
    ComponentHeaderComponent, MatCardModule, ScrollspyDirective, ExploreListButtonComponent,
    MatPaginatorModule, LigandCardComponent, CommonModule, FlexLayoutModule
  ];
  constructor(
    private _route: ActivatedRoute,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    public dynamicServices: DynamicServicesService) {
  super(dynamicServices);
  }

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

  pageData: PageData;

  /**
   * subscribe to data changes and set data when it arrives
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target && this.target[this.params.fieldName]) {
          if (this.target[this.params.fieldName].length === 0) {
            this.hideSection();
          }
          else{
            this.showSection();
          }
        }

        if (this.target) {
          this.pageData = new PageData({
            total: this.target[this.params.countName],
            skip: 0,
            top: 10
          });
        }
        this.changeRef.markForCheck();
        this.loadingComplete();
      });
  }

  /**
   * paginate ligand list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loadingStart();
    const ligandSerializer = new LigandSerializer();
    const pageParams = {};
    this.pageData.skip = event.pageIndex * event.pageSize;
    pageParams[this.params.topParam] = event.pageSize;
    pageParams[this.params.skipParam] = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, this.params.componentName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      this.target[this.params.fieldName] = res.data.targets[this.params.fieldName].map(lig => ligandSerializer.fromJson(lig));
      this.loadingComplete(false);
      this.changeRef.markForCheck();
    });
  }
}

export class DrugPanelParameters{
  fieldName = 'drugs';
  countName = 'drugCount';
  topParam = 'drugstop';
  skipParam = 'drugsskip';
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
