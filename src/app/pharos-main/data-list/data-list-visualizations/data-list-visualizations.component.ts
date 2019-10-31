import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from '../filter-panel/facet-retriever.service';
import {Facet} from '../../../models/facet';

/**
 * component to show various facets like a dashboard.
 * todo: may be extended to include starburst charts or other visualizations
 */
@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.scss'],

})

export class DataListVisualizationsComponent implements OnInit {
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
   * todo: could be done without the pathresolver service
   * @param {PathResolverService} pathResolverService
   * @param {FacetRetrieverService} facetRetrieverService
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private pathResolverService: PathResolverService,
    private facetRetrieverService: FacetRetrieverService,
    private pharosConfig: PharosConfig) { }


  /**
   * get list of available facets, then retrieve the first facet (default) on the list
   */
  ngOnInit() {
    console.log(this);
    /*    this.chartFacets = this.pharosConfig.getAllChartFacets(this.pathResolverService.getPath());
    this.facetRetrieverService.getAllFacets().subscribe(facets => {
      if (facets  && facets.size > 0) {
        if (this.chartFacets.donut.length > 0) {
          this.filteredFacets = [];
          this.chartFacets.donut.forEach(f => {
            const facet = facets.get(f.name);
            if (facet) {
              facet.label = f.label;
              this.filteredFacets.push(facet);
            }
          });
*/
          this.facets = this.data.facets;
          this.donutData = this.data.facets[0];
        }
    /*  }
    });*/
 // }

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
  filterDonutChart(data: any ) {
    console.log(data);
    this.pathResolverService.mapSelection({name: this.donutData.facet, change: {added: [data.name] }});
    this.pathResolverService.navigate();
  }
}
