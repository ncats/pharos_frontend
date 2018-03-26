import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataListComponent} from "./data-list/data-list.component";
import {DonutChartComponent} from "./visualizations/donut-chart/donut-chart.component";
import {BreadcrumbComponent} from "../tools/breadcrumb/breadcrumb.component";
import {DataListVisualizationsComponent} from "./data-list-visualizations/data-list-visualizations.component";
import {SunburstChartComponent} from "./visualizations/sunburst-chart/sunburst-chart.component";
import {FacetTableComponent} from "./filter-panel/facet-table/facet-table.component";
import {WordCloudChartComponent} from "./visualizations/word-cloud-chart/word-cloud-chart.component";
import {VisualizationOptionsComponent} from "./data-list-visualizations/visualization-options/visualization-options.component";
import {DataDetailsComponent} from "./data-details/data-details.component";
import {PharosPaginatorComponent} from "../tools/pharos-paginator/pharos-paginator.component";
import {FilterPanelComponent} from "./filter-panel/filter-panel.component";
import {DataListResolver} from "./services/data-list.resolver";
import {RouterModule, Routes} from "@angular/router";
import {PharosMainComponent} from "./pharos-main.component";

const pharosMainRoutes: Routes = [
  {
    path: '',
     component: PharosMainComponent,
     resolve: {
       data: DataListResolver
     },
     // this reloads the component/resolver when the url changes from pagination or sort
     runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
]



@NgModule({
  imports: [
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataListResolver
  ],
  declarations: [

  ]
})
export class PharosMainRoutingModule { }
