import {NgModule} from '@angular/core';
import {FilterPanelComponent} from '../pharos-main/data-list/filter-panel/filter-panel.component';
import {FacetTableComponent} from '../pharos-main/data-list/filter-panel/facet-table/facet-table.component';
import {DataListComponent} from '../pharos-main/data-list/data-list.component';
import {FacetListComponent} from '../pharos-main/data-list/data-list-visualizations/facet-list/facet-list.component';
import {DataListVisualizationsComponent} from '../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {SharedModule} from './shared.module';
import {DonutChartComponent} from '../tools/visualizations/donut-chart/donut-chart.component';
import {VisualizationOptionsComponent} from '../pharos-main/data-list/data-list-visualizations/visualization-options/visualization-options.component';
import {CommonToolsModule} from '../tools/common-tools.module';
import {RouterModule} from '@angular/router';
import {PharosLoadingSpinnerModule} from '../tools/pharos-loading-spinner/pharos-loading-spinner.module';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {TOKENS} from '../../config/component-tokens';

@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule,
    RouterModule,
    PharosLoadingSpinnerModule
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
    DataListResolver,
    ComponentsResolver,
    {provide: TOKENS.PHAROS_VISUALIZATION_COMPONENT, useValue: DataListVisualizationsComponent},
    {provide: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT, useValue: FacetListComponent},
    {provide: TOKENS.PHAROS_FACETS_COMPONENT, useValue: FilterPanelComponent}
  ],
  entryComponents: [
    FilterPanelComponent,
    VisualizationOptionsComponent,
    DataListVisualizationsComponent
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
