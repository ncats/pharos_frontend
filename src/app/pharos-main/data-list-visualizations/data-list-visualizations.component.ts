import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {Subject, Observable, combineLatest} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {PharosConfig} from "../../../config/pharos-config";

@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.css'],
})
export class DataListVisualizationsComponent implements AfterViewInit, OnDestroy {
  donutData: any;
  sunburstData: any;
  cloudData: any;
  chartFacets: any;
  selectedDonut: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private pathResolverService: PathResolverService,
    private facetRetrieverService: FacetRetrieverService,
    private pharosConfig: PharosConfig) { }

  ngAfterViewInit() {
        this.chartFacets = this.pharosConfig.getAllChartFacets(this.pathResolverService.getPath());
        if (this.chartFacets.donut.length > 0) {
          this.facetRetrieverService.getFacetObservable(this.chartFacets.donut[0].name)
            .subscribe(res => {
              this.donutData = res;
            });
        }
  }

  changeDonutChart(field: string): void {
    this.selectedDonut = field;
    this.facetRetrieverService.getFacetObservable(field)
      .subscribe(res => {
        this.donutData = res;
      });
  }

  filterDonutChart(data: any ) {
    this.pathResolverService.mapSelection({name: this.donutData.name, change: {added: [data.label] }});
    this.pathResolverService.navigate();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
