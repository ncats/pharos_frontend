import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {Facet} from '../../../models/facet';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../models/page-data';

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

  @Input() data: any = {};

  /**
   * constructor to get config object and specified facets
   * @param {PathResolverService} pathResolverService
   * @param selectedFacetService
   * @param {PharosConfig} pharosConfig
   */
  constructor(private pathResolverService: PathResolverService,
              private selectedFacetService: SelectedFacetService,
              private pharosConfig: PharosConfig) {
    super();
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
        console.log(this);
        if (this.data && this.data.facets) {
          this.facets = this.data.facets;
          this.donutData = this.data.facets[0];
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
  }

  /**
   * change url and fetch filtered data based on facet selection
   * @param data
   */
  filterDonutChart(data: any) {
    this.selectedFacetService.setFacets({name: this.donutData.facet, change: {added: [data.name]}});
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);
  }
}
