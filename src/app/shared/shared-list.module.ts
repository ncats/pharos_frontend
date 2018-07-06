///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {FilterPanelComponent} from '../pharos-main/filter-panel/filter-panel.component';
import {FacetTableComponent} from '../pharos-main/filter-panel/facet-table/facet-table.component';
import {DataListComponent} from '../pharos-main/data-list/data-list.component';
import {FacetListComponent} from '../pharos-main/facet-list/facet-list.component';
import {PharosPaginatorComponent} from '../tools/pharos-paginator/pharos-paginator.component';
import {DataListVisualizationsComponent} from '../pharos-main/data-list-visualizations/data-list-visualizations.component';
import {SharedModule} from './shared.module';
import {DonutChartComponent} from '../tools/visualizations/donut-chart/donut-chart.component';
import {VisualizationOptionsComponent} from '../pharos-main/data-list-visualizations/visualization-options/visualization-options.component';
import {DataListResolver} from '../pharos-main/services/data-list.resolver';


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
    VisualizationOptionsComponent
  ],
  providers: [
    DataListResolver
  ],
  exports: [
    SharedModule,
    PharosMainComponent,
    DataListComponent,
    DataListVisualizationsComponent,
    PharosPaginatorComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    VisualizationOptionsComponent

  ]
})
export class SharedListModule { }
