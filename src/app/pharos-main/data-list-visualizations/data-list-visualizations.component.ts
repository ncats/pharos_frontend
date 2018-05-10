import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {Subject, combineLatest} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FacetRetrieverService} from '../services/facet-retriever.service';

@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.css'],
})
export class DataListVisualizationsComponent implements OnInit, OnDestroy {
  donutData: any;
  sunburstData: any;
  cloudData: any;
  chartFacets: any;
  loaded = false;
  selectedDonut: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private pathResolverService: PathResolverService,
    private facetRetrieverService: FacetRetrieverService,
    private environmentVariablesService: EnvironmentVariablesService) { }

  ngOnInit() {
    const params$ =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$,
        (path, loaded) => ({path: path, loaded: loaded}))
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((res) => {
          this.chartFacets = this.environmentVariablesService.getAllChartFacets(res.path);
            this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name).subscribe(facets => this.donutData = facets);
          this.loaded = res.loaded;
        });
  }

  changeDonutChart(field: string): void {
    this.selectedDonut = field;
    this.facetRetrieverService.getFacetObservable(field).subscribe(res => {
      if (res) {
        this.donutData = res;
      }
    });
  }

  filterDonutChart(data: any ) {
    this.pathResolverService.mapSelection({facet: this.donutData.name, fields: [data.label]});
    this.pathResolverService.navigate();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
