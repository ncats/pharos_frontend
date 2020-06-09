import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnatamogramModule} from './anatamogram/anatamogram.module';
import {BatchUploadModalComponent} from './batch-upload-modal/batch-upload-modal.component';
import {DynamicPanelComponent} from './dynamic-panel/dynamic-panel.component';
import {DynamicTablePanelComponent} from './dynamic-table-panel/dynamic-table-panel.component';
import {EquationRendererComponent} from './equation-renderer/equation-renderer.component';
import {HelpPanelComponent} from './help-panel/help-panel.component';
import {IdgLevelIndicatorComponent} from './idg-level-indicator/idg-level-indicator.component';
import {KnowledgeTableComponent} from './knowledge-table/knowledge-table.component';
import {LinkListComponent} from './link-list/link-list.component';
import {ProteinStructureViewerComponent} from './protein-structure-viewer/protein-structure-viewer.component';
import {GenericTableModule} from './generic-table/generic-table.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {RadarChartModule} from './visualizations/radar-chart/radar-chart.module';
import {StructureViewComponent} from './structure-view/structure-view.component';
import {NcatsHeaderModule} from './ncats-header/ncats-header.module';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { ExploreListButtonComponent } from './explore-list-button/explore-list-button.component';

@NgModule({
  declarations: [
    BatchUploadModalComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    ProteinStructureViewerComponent,
    StructureViewComponent,
    ListFilterComponent,
    ExploreListButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AnatamogramModule,
    NgxJsonViewerModule,
    GenericTableModule,
    RadarChartModule
  ],
  exports: [
    NcatsHeaderModule,
    AnatamogramModule,
    RadarChartModule,
    GenericTableModule,
    BatchUploadModalComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    StructureViewComponent,
    ProteinStructureViewerComponent,
    ListFilterComponent,
    ExploreListButtonComponent
  ]
})
export class CommonToolsModule { }
