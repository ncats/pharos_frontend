import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnatamogramModule} from './anatamogram/anatamogram.module';
import {BatchUploadModalComponent} from './batch-upload-modal/batch-upload-modal.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
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
import {PharosPaginatorModule} from './pharos-paginator/pharos-paginator.module';
import {NcatsHeaderModule} from './ncats-header/ncats-header.module';
import { TopicNodeGeneratorComponent } from './topic-node-generator/topic-node-generator.component';

@NgModule({
  declarations: [
    BatchUploadModalComponent,
    BreadcrumbComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    ProteinStructureViewerComponent,
    StructureViewComponent,
    TopicNodeGeneratorComponent
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
    BatchUploadModalComponent,
    IdgLevelIndicatorComponent
  ],
  exports: [
    NcatsHeaderModule,
    AnatamogramModule,
    RadarChartModule,
    GenericTableModule,
    BatchUploadModalComponent,
    BreadcrumbComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    EquationRendererComponent,
    HelpPanelComponent,
    IdgLevelIndicatorComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    PharosPaginatorModule,
    ProteinStructureViewerComponent
  ]
})
export class CommonToolsModule { }
