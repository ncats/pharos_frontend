import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {PathResolverService} from "../../pharos-services/path-resolver.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {FacetRetrieverService} from "../services/facet-retriever.service";

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

  private ngUnsubscribe: Subject<any> = new Subject();

//  chartFacets: any = {donut: ['data1', 'data2', 'data3'], sunburst:[], cloud: []};
  constructor(
        private pathResolverService: PathResolverService,
    private facetRetrieverService: FacetRetrieverService,
    private environmentVariablesService: EnvironmentVariablesService) { }

  ngOnInit() {
    // todo - fix row height
    const params$ =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$,
        (path, loaded) => ({path: path, loaded: loaded}))
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((res) => {
          console.log(res);
          this.chartFacets = this.environmentVariablesService.getAllChartFacets(res.path);
          // todo - don't want to have to do this for all chart types - the options should call the first one
          this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name).subscribe(res=> this.donutData = res);
          this.loaded = res.loaded;
          console.log(this);
        })
  }

  changeDonutChart(field: string): void{
    console.log(field);
    this.facetRetrieverService.getFacetObservable(field).subscribe(res=> this.donutData = res);
    console.log(this.donutData);
  }

  filterChart(event: any ) {
    console.log(event);
    //navigationExtras.queryParams = { top: event.pageSize, skip: event.pageIndex * event.pageSize };
   // this._nagivate(navigationExtras);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
