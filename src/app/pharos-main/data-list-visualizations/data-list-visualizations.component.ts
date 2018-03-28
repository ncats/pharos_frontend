import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {PathResolverService} from "../../pharos-services/path-resolver.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {FacetRetrieverService} from "../services/facet-retriever.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Facet} from "../../models/facet";

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

//  chartFacets: any = {donut: ['data1', 'data2', 'data3'], sunburst:[], cloud: []};
  constructor(
        private pathResolverService: PathResolverService,
    private facetRetrieverService: FacetRetrieverService,
    private environmentVariablesService: EnvironmentVariablesService,
    private _router : Router,
        private _route: ActivatedRoute) { }

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
          this.chartFacets = this.environmentVariablesService.getAllChartFacets(res.path);
          // todo - don't want to have to do this for all chart types - the options should call the first one
          if(!this.selectedDonut) {
           this.selectedDonut = this.chartFacets.donut[0].name;
            this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name).subscribe(res => this.donutData = res);
          }
          this.loaded = res.loaded;
        })
    console.log(this);
  }

  changeDonutChart(field: string): void{
    this.selectedDonut = field;
    this.facetRetrieverService.getFacetObservable(field).subscribe(res=> {
      console.log(res);
      if (res) {
        this.donutData = res;
      }
    });
  }

  filterDonutChart(data: any ) {
    const prev = this._route.snapshot.queryParamMap.getAll('facet');
    let facetList: string[] = prev ? prev : [];
    facetList.push(this._makeFacetString(this.donutData, data.label));
    console.log(facetList);
    const navigationExtras: NavigationExtras = {
      queryParams: {facet: facetList}
    };
    this._router.onSameUrlNavigation ='reload'; //forces reload since technically, this is the same navigation url
    this._router.navigate([], navigationExtras);
  }

  private _makeFacetString(facet: Facet, field: string): string {
    return facet.name.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString())
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
