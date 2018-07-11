import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {Subject, Observable, combineLatest} from 'rxjs';
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
    const params$: Observable<any> =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$);

        params$
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(([path, loaded]) => {
          this.chartFacets = this.environmentVariablesService.getAllChartFacets(path);
            this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name).subscribe(facets => this.donutData = facets);
          this.loaded = loaded;
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
    console.log(data);
    // this.pathResolverService.mapSelection({facet: this.donutData.name, fields: [data.label]});
    this.pathResolverService.mapSelection({name: this.donutData.name, change: {added: [data.label] }});
    this.pathResolverService.navigate();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
