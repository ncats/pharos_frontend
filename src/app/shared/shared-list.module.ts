///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import {NgModule} from '@angular/core';
import {FilterPanelComponent} from '../pharos-main/data-list/filter-panel/filter-panel.component';
import {FacetTableComponent} from '../pharos-main/data-list/filter-panel/facet-table/facet-table.component';
import {DataListComponent} from '../pharos-main/data-list/data-list.component';
import {FacetListComponent} from '../pharos-main/data-list/facet-list/facet-list.component';
import {
  DataListVisualizationsComponent
} from '../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {SharedModule} from './shared.module';
import {DonutChartComponent} from '../tools/visualizations/donut-chart/donut-chart.component';
import {
  VisualizationOptionsComponent
} from '../pharos-main/data-list/data-list-visualizations/visualization-options/visualization-options.component';
import {DataListResolver} from '../pharos-main/data-list/data-list.resolver';
import {CommonToolsModule} from '../tools/common-tools.module';


@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule
  ],
  declarations: [
    DataListComponent,
    DataListVisualizationsComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    VisualizationOptionsComponent
  ],
  providers: [
    DataListResolver
  ],
  exports: [
    SharedModule,
    DataListComponent,
    DataListVisualizationsComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    VisualizationOptionsComponent

  ]
})
export class SharedListModule { }
