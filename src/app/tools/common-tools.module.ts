import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnatamogramModule} from './anatamogram/anatamogram.module';
import {ApiViewerComponent} from './api-viewer/api-viewer.component';
import {BatchUploadModalComponent} from './batch-upload-modal/batch-upload-modal.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {DynamicPanelComponent} from './dynamic-panel/dynamic-panel.component';
import {DynamicTablePanelComponent} from './dynamic-table-panel/dynamic-table-panel.component';
import {EquationRendererComponent} from './equation-renderer/equation-renderer.component';
import {HelpPanelComponent} from './help-panel/help-panel.component';
import {IdgLevelIndicatorComponent} from './idg-level-indicator/idg-level-indicator.component';
import {KnowledgeTableComponent} from './knowledge-table/knowledge-table.component';
import {LinkListComponent} from './link-list/link-list.component';
import {SketcherComponent} from './marvin-sketcher/sketcher.component';
import {ProteinStructureViewerComponent} from './protein-structure-viewer/protein-structure-viewer.component';
import {GenericTableModule} from './generic-table/generic-table.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {RadarChartModule} from './visualizations/radar-chart/radar-chart.module';
import {SearchComponent} from './search-component/search.component';
import {HighlightPipe} from './search-component/highlight.pipe';
import {NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import { StructureViewComponent } from './structure-view/structure-view.component';
import {PharosPaginatorModule} from "./pharos-paginator/pharos-paginator.module";

@NgModule({
  declarations: [
    ApiViewerComponent,
    BatchUploadModalComponent,
    BreadcrumbComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    SketcherComponent,
    ProteinStructureViewerComponent,
    HighlightPipe,
    SearchComponent,
    NcatsHeaderComponent,
    StructureViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AnatamogramModule,
    NgxJsonViewerModule,
    GenericTableModule,
    RadarChartModule,
    PharosPaginatorModule
  ],
  entryComponents: [
    BreadcrumbComponent,
    BatchUploadModalComponent
  ],
  exports: [
    AnatamogramModule,
    RadarChartModule,
    GenericTableModule,
    ApiViewerComponent,
    BatchUploadModalComponent,
    BreadcrumbComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    SketcherComponent,
    PharosPaginatorModule,
    ProteinStructureViewerComponent,
    HighlightPipe,
    SearchComponent,
    NcatsHeaderComponent
  ]
})
export class CommonToolsModule { }
