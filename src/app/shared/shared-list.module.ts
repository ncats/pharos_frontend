import {NgModule} from '@angular/core';
import {FilterPanelComponent} from '../pharos-main/data-list/filter-panel/filter-panel.component';
import {SelectedFacetListComponent} from '../pharos-main/data-list/selected-facet-list/selected-facet-list.component';
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
import {FilterRepresentationComponent} from '../pharos-main/analyze-list/filter-representation/filter-representation.component';
import {AnalyzeHeaderComponent} from '../pharos-main/analyze-list/analyze-header/analyze-header.component';
import {SequenceSearchComponent} from '../pharos-main/analyze-list/sequence-search/sequence-search.component';
import {HierarchyViewerComponent} from "../pharos-main/analyze-list/hierarchy-viewer/hierarchy-viewer.component";
import {FilterPanelModule} from "../pharos-main/data-list/filter-panel/filter-panel.module";

@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule,
    RouterModule,
    PharosLoadingSpinnerModule,
    FilterPanelModule
  ],
  declarations: [
    DataListVisualizationsComponent,
    FilterRepresentationComponent,
    HierarchyViewerComponent,
    SequenceSearchComponent,
    FilterPanelComponent,
    SelectedFacetListComponent,
    DonutChartComponent,
    VisualizationOptionsComponent
  ],
  providers: [
    DataListResolver,
    ComponentsResolver,
    {provide: TOKENS.PHAROS_FACET_REPRESENTATION_COMPONENT, useValue: FilterRepresentationComponent},
    {provide: TOKENS.PHAROS_HIERARCHY_VIEWER_COMPONENT, useValue: HierarchyViewerComponent},
    {provide: TOKENS.PHAROS_VISUALIZATION_COMPONENT, useValue: DataListVisualizationsComponent},
    {provide: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT, useValue: SelectedFacetListComponent},
    {provide: TOKENS.PHAROS_FACETS_COMPONENT, useValue: FilterPanelComponent},
    {provide: TOKENS.PHAROS_ANALYZE_HEADER_COMPONENT, useValue: AnalyzeHeaderComponent},
    {provide: TOKENS.PHAROS_SEQUENCE_LIST_COMPONENT, useValue: SequenceSearchComponent}
  ],
  exports: [
    SharedModule,
    DataListVisualizationsComponent,
    FilterPanelComponent,
    SelectedFacetListComponent,
    DonutChartComponent,
    VisualizationOptionsComponent
  ]
})
export class SharedListModule { }
