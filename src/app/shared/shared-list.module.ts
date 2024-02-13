import {NgModule} from '@angular/core';
import {FilterPanelComponent} from '../pharos-main/data-list/filter-panel/filter-panel.component';
import {SelectedFacetListComponent} from '../pharos-main/data-list/selected-facet-list/selected-facet-list.component';
import {DataListVisualizationsComponent} from '../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {SharedModule} from './shared.module';
import {CommonToolsModule} from '../tools/common-tools.module';
import {RouterModule} from '@angular/router';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {TOKENS} from '../../config/component-tokens';
import {FilterRepresentationComponent} from '../pharos-main/analyze-list/filter-representation/filter-representation.component';
import {AnalyzeHeaderComponent} from '../pharos-main/analyze-list/analyze-header/analyze-header.component';
import {SequenceSearchComponent} from '../pharos-main/analyze-list/sequence-search/sequence-search.component';
import {HierarchyViewerComponent} from "../pharos-main/analyze-list/hierarchy-viewer/hierarchy-viewer.component";

@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule,
    RouterModule
  ],
  providers: [
    DataListResolver,
    ComponentsResolver,
    {provide: TOKENS.PHAROS_FACET_REPRESENTATION_COMPONENT, useValue: FilterRepresentationComponent},
    {provide: TOKENS.PHAROS_HIERARCHY_VIEWER_COMPONENT, useValue: HierarchyViewerComponent},
    {provide: TOKENS.PHAROS_VISUALIZATION_COMPONENT, useValue: DataListVisualizationsComponent},
    {provide: TOKENS.PHAROS_ANALYZE_HEADER_COMPONENT, useValue: AnalyzeHeaderComponent},
    {provide: TOKENS.PHAROS_SEQUENCE_LIST_COMPONENT, useValue: SequenceSearchComponent}
  ],
  exports: [
    SharedModule
  ]
})
export class SharedListModule { }
