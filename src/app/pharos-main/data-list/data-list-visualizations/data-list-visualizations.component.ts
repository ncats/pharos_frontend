import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {Facet} from '../../../models/facet';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PathResolverService} from '../filter-panel/path-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

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
  /**
   * data passed to visualization
   */
  donutData: Facet;

  /**
   * list of all available chart facets
   */
  chartFacets: any;

  /**
   * selected facet field
   */
  selectedDonut: string;

  /**
   * list of initial facets to display
   */
  facets: Facet[];

  /**
   * constructor to get config object and specified facets
   * @param pathResolverService
   * @param _route
   * @param selectedFacetService
   * @param {PharosConfig} pharosConfig
   */
  constructor(private pathResolverService: PathResolverService,
              private _route: ActivatedRoute,
              private selectedFacetService: SelectedFacetService,
              private pharosConfig: PharosConfig,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }


  /**
   * get list of available facets, then retrieve the first facet (default) on the list
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.facets) {
          this.facets = this.data.facets.filter(f => f.dataType !== 'Numeric' && f.values.length > 0);
          let selection;
          if (!!this.selectedDonut) { // remember which facet was selected, if there was one
            selection = this.facets.find(d => {
              return d.facet === this.selectedDonut;
            });
          }
          if (!selection){
            selection = this.facets[0];
          }
          this.donutData = selection;
        }
      });
  }

  /**
   * retrieve facet data for a selected field
   * change selected data for the visualization
   * @param {string} field
   */
  changeDonutChart(field: string): void {
    this.selectedDonut = field;
    this.donutData = this.facets.filter(facet => facet.facet === field)[0];
    this.donutData.values = this.donutData.values.filter(v => true); // trigger changes on bound property
  }

  /**
   * change url and fetch filtered data based on facet selection
   * @param data
   */
  filterDonutChart(data: any) {
    this.selectedFacetService.setFacets({name: this.donutData.facet, change: {added: [data.name]}});
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

}
