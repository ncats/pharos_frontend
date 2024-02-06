import {Component, OnInit} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {Facet} from '../../../models/facet';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PathResolverService} from '../filter-panel/path-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {Subject} from 'rxjs';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {TourType} from '../../../models/tour-type';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';

/**
 * component to show various facets like a dashboard.
 * todo: may be extended to include starburst charts or other visualizations
 */
@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.scss'],

})

export class DataListVisualizationsComponent extends DynamicPanelComponent implements OnInit {

  redrawCharts: Subject<string> = new Subject<string>();

  /**
   * data passed to visualization
   */
  displayFacet: Facet;
  tourType: TourType;

  /**
   * list of initial facets to display
   */
  facets: Facet[];
  model: string;

  /**
   * constructor to get config object and specified facets
   * @param pathResolverService
   * @param _route
   * @param selectedFacetService
   * @param {PharosConfig} pharosConfig
   */
  constructor(private centralStorageService: CentralStorageService,
              private pathResolverService: PathResolverService,
              private dialog: MatDialog,
              private _route: ActivatedRoute,
              private selectedFacetService: SelectedFacetService,
              private pharosConfig: PharosConfig,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  showTour() {
    return !this.displayFacet?.singleResponse;
  }

  redrawChildren(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.redrawCharts.next('donut-chart');
    } else if (event.index === 2) {
      this.redrawCharts.next('upset-plot');
    } else {
      this.redrawCharts.next('multidimensional-facet-plot');
    }
  }

  /**
   * get list of available facets, then retrieve the first facet (default) on the list
   */
  ngOnInit() {
    this.tourType = TourType.UpsetChartTour;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data && this.data.facets) {
          this.model = this._route.snapshot.data.path;
          this.centralStorageService.displayFacetChanged
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(obj => {
            if (obj.model === this.model) {
              this.changeSelectedFacet(obj.facet);
            }
          });
          this.facets = this.data.facets.filter(f => f.dataType !== 'Numeric' && f.values.length > 0);
          const displayFacetString = this.centralStorageService.getDisplayFacet(this.model);
          if (!displayFacetString) {
            this.centralStorageService.setDisplayFacet(this.model, this.facets[0].facet);
          } else {
            this.changeSelectedFacet(displayFacetString);
          }
        }
      });
  }

  /**
   * retrieve facet data for a selected field
   * change selected data for the visualization
   * @param {string} field
   */
  changeSelectedFacet(field: string): void {
    this.displayFacet = this.facets.find(facet => facet.facet === field);
    if (!this.displayFacet) {
      this.displayFacet = this.facets[0];
    }
    this.displayFacet.values = this.displayFacet.values.filter(v => true); // trigger changes on bound property
  }

  /**
   * change url and fetch filtered data based on facet selection
   * @param data
   */
  filterDonutChart(data: any) {
    this.selectedFacetService.setFacets({name: this.displayFacet.facet, change: {added: [data.name]}});
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }
}
