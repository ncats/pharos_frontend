///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {BreadcrumbComponent} from "../tools/breadcrumb/breadcrumb.component";
import {DataDetailsComponent} from "../pharos-main/data-details/data-details.component";
import {NcatsHeaderComponent} from "../tools/ncats-header/ncats-header.component";
import {PharosMainComponent} from "../pharos-main/pharos-main.component";
import {NcatsFooterComponent} from "../tools/ncats-footer/ncats-footer.component";
import {FilterPanelComponent} from "../pharos-main/filter-panel/filter-panel.component";
import {FacetTableComponent} from "../pharos-main/filter-panel/facet-table/facet-table.component";
import {DataListComponent} from "../pharos-main/data-list/data-list.component";
import {FacetListComponent} from "../pharos-main/facet-list/facet-list.component";
import {PharosPaginatorComponent} from "../tools/pharos-paginator/pharos-paginator.component";
import {DataListVisualizationsComponent} from "../pharos-main/data-list-visualizations/data-list-visualizations.component";
import {SharedModule} from "./shared.module";
import {PatentPanelComponent} from "../pharos-main/data-details/target-details/panels/patent-panel/patent-panel.component";
import {DonutChartComponent} from "../pharos-main/visualizations/donut-chart/donut-chart.component";
import {VisualizationOptionsComponent} from "../pharos-main/data-list-visualizations/visualization-options/visualization-options.component";
import {WordCloudChartComponent} from "../pharos-main/visualizations/word-cloud-chart/word-cloud-chart.component";
import {SunburstChartComponent} from "../pharos-main/visualizations/sunburst-chart/sunburst-chart.component";
import {DataListResolver} from "../pharos-main/services/data-list.resolver";


@NgModule({
  imports: [
SharedModule
  ],
  declarations: [
    PharosMainComponent,
    DataListComponent,
    DataListVisualizationsComponent,
    PharosPaginatorComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    WordCloudChartComponent,
    SunburstChartComponent,
    VisualizationOptionsComponent,
    PatentPanelComponent
  ],
  providers: [
    DataListResolver
  ],
  exports: [
    PharosMainComponent,
    DataListComponent,
    DataListVisualizationsComponent,
    PharosPaginatorComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    WordCloudChartComponent,
    SunburstChartComponent,
    VisualizationOptionsComponent,
    PatentPanelComponent
  ]
})
export class SharedListModule { }
