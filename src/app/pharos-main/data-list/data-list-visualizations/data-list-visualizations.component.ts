import {AfterViewInit, Component} from '@angular/core';
import {PharosConfig} from "../../../../config/pharos-config";
import {PathResolverService} from "../../../pharos-services/path-resolver.service";
import {FacetRetrieverService} from '../filter-panel/facet-retriever.service';
import {Facet} from "../../../models/facet";

/**
 * component to show various facets like a dashboard.
 * todo: may be extended to include starburst charts or other visualizations
 */
@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.scss'],
})

export class DataListVisualizationsComponent implements AfterViewInit {
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
  ngAfterViewInit() {
        this.chartFacets = this.pharosConfig.getAllChartFacets(this.pathResolverService.getPath());
        if (this.chartFacets.donut.length > 0) {
          this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name)
            .subscribe(res => {
              this.donutData = res;
            });
        }
  }

  /**
   * retrieve facet data for a selected field
   * change selected data for the visualization
   * @param {string} field
   */
  changeDonutChart(field: string): void {
    this.selectedDonut = field;
    this.facetRetrieverService.getFacetObservable(field)
      .subscribe(res => {
        this.donutData = res;
      });
  }

  /**
   * change url and fetch filtered data based on facet selection
   * @param data
   */
  filterDonutChart(data: any ) {
    this.pathResolverService.mapSelection({name: this.donutData.name, change: {added: [data.label] }});
    this.pathResolverService.navigate();
  }
}
