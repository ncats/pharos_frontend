import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnatomogramModule} from './anatomogram/anatomogram.module';
import {BatchUploadModalComponent} from './batch-upload-modal/batch-upload-modal.component';
import {DynamicPanelComponent} from './dynamic-panel/dynamic-panel.component';
import {DynamicTablePanelComponent} from './dynamic-table-panel/dynamic-table-panel.component';
import {HelpPanelComponent} from './help-panel/help-panel.component';
import {KnowledgeTableComponent} from './knowledge-table/knowledge-table.component';
import {LinkListComponent} from './link-list/link-list.component';
import {GenericTableModule} from './generic-table/generic-table.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {RadarChartModule} from './visualizations/radar-chart/radar-chart.module';
import {StructureViewComponent} from './structure-view/structure-view.component';
import {NcatsHeaderModule} from './ncats-header/ncats-header.module';
import {ListFilterComponent} from './list-filter/list-filter.component';
import {ExploreListButtonComponent} from './explore-list-button/explore-list-button.component';
import {AssociationDataSourcesArticleComponent} from './help-panel/articles/association-data-sources-article/association-data-sources-article.component';
import {ExpressionDataSourcesArticleComponent} from './help-panel/articles/expression-data-sources-article/expression-data-sources-article.component';
import {PPIDataSourcesArticleComponent} from './help-panel/articles/ppidata-sources-article/ppidata-sources-article.component';
import {PathwayDataSourcesArticleComponent} from './help-panel/articles/pathway-data-sources-article/pathway-data-sources-article.component';
import {AffiliateLinkComponent} from './affiliate-link/affiliate-link.component';
import {DynamicPanelBaseComponent} from './dynamic-panel-base/dynamic-panel-base.component';
import {ExpressionHeatMapComponent} from './visualizations/expression-heat-map/expression-heat-map.component';
import {GoTermsEvidenceArticleComponent} from './help-panel/articles/go-terms-evidence-article/go-terms-evidence-article.component';
import {VennDiagramComponent} from './visualizations/venn-diagram/venn-diagram.component';
import {FieldSelectionDialogComponent} from './field-selection-dialog/field-selection-dialog.component';
import {ModelDetailsComponent} from './model-details/model-details.component';
import { UpsetPlotComponent } from './visualizations/upset-plot/upset-plot.component';
import { UpsetModule } from './visualizations/upset/upset.module';
import { UpsetFieldEditComponent } from './upset-field-edit/upset-field-edit.component';
import {FacetTableModule} from '../pharos-main/data-list/filter-panel/facet-table/facet-table.module';
import { HeatMapComponent } from './visualizations/heat-map/heat-map.component';
import { BatchResolveModalComponent } from './batch-resolve-modal/batch-resolve-modal.component';
import { SequenceAlignmentsComponent } from './visualizations/sequence-alignments/sequence-alignments.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { DataVersionCardComponent } from './data-version-card/data-version-card.component';
import { PredictionsPanelComponent } from './predictions-panel/predictions-panel.component';
import { PredictionDetailsCardComponent } from './predictions-panel/prediction-details-card/prediction-details-card.component';
import { PredictionSetComponent } from './predictions-panel/prediction-set/prediction-set.component';
import { CitationComponent } from './citation/citation.component';
import { GardRareComponent } from './gard-rare/gard-rare.component';

@NgModule({
  declarations: [
    BatchUploadModalComponent,
    DynamicPanelBaseComponent,
    DynamicPanelComponent,
    DynamicTablePanelComponent,
    HelpPanelComponent,
    KnowledgeTableComponent,
    LinkListComponent,
    StructureViewComponent,
    ListFilterComponent,
    ExploreListButtonComponent,
    AssociationDataSourcesArticleComponent,
    ExpressionDataSourcesArticleComponent,
    PPIDataSourcesArticleComponent,
    PathwayDataSourcesArticleComponent,
    AffiliateLinkComponent,
    GoTermsEvidenceArticleComponent,
    ExpressionHeatMapComponent,
    VennDiagramComponent,
    FieldSelectionDialogComponent,
    ModelDetailsComponent,
    UpsetPlotComponent,
    UpsetFieldEditComponent,
    HeatMapComponent,
    BatchResolveModalComponent,
    SequenceAlignmentsComponent,
    TaskItemComponent,
    DataVersionCardComponent,
    PredictionsPanelComponent,
    PredictionDetailsCardComponent,
    PredictionSetComponent,
    CitationComponent,
    GardRareComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AnatomogramModule,
    NgxJsonViewerModule,
    GenericTableModule,
    RadarChartModule,
    UpsetModule,
    FacetTableModule
  ],
    exports: [
        NcatsHeaderModule,
        AnatomogramModule,
        RadarChartModule,
        GenericTableModule,
        BatchUploadModalComponent,
        DynamicPanelComponent,
        DynamicTablePanelComponent,
        HelpPanelComponent,
        KnowledgeTableComponent,
        LinkListComponent,
        StructureViewComponent,
        ListFilterComponent,
        ExpressionHeatMapComponent,
        ExploreListButtonComponent,
        AffiliateLinkComponent,
        VennDiagramComponent,
        UpsetPlotComponent,
        HeatMapComponent,
        SequenceAlignmentsComponent,
        TaskItemComponent,
        GardRareComponent
    ],
  entryComponents: [
    FieldSelectionDialogComponent
  ]
})
export class CommonToolsModule {
}
