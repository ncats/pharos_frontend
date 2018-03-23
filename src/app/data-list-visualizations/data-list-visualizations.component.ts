import {Component, OnInit} from '@angular/core';
import {EnvironmentVariablesService} from "../services/environment-variables.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.css'],
})
export class DataListVisualizationsComponent implements OnInit {
data: any;
datum: any;
selected: string;
chartFacets: any;
facets: any = {donut: ['data1', 'data2', 'data3'], sunburst:[], cloud: []};
  constructor(
    private router : Router,
    private environmentVariablesService: EnvironmentVariablesService) { }

  ngOnInit() {
    console.log(this);
    this.chartFacets = this.environmentVariablesService.getAllChartFacets(this.router.url.split('/')[1].split('?')[0]);
  }

  paginationChanges(event: any ) {
    navigationExtras.queryParams = { top: event.pageSize, skip: event.pageIndex * event.pageSize };
    this._nagivate(navigationExtras);
  }
}
