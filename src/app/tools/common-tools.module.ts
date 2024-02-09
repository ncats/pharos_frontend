import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BatchUploadModalComponent} from './batch-upload-modal/batch-upload-modal.component';
import {DynamicPanelComponent} from './dynamic-panel/dynamic-panel.component';
import {DynamicTablePanelComponent} from './dynamic-table-panel/dynamic-table-panel.component';
import {HelpPanelComponent} from './help-panel/help-panel.component';
import {LinkListComponent} from './link-list/link-list.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {StructureViewComponent} from './structure-view/structure-view.component';
import {NcatsHeaderModule} from './ncats-header/ncats-header.module';
import {ExploreListButtonComponent} from './explore-list-button/explore-list-button.component';
import {AssociationDataSourcesArticleComponent} from './help-panel/articles/association-data-sources-article/association-data-sources-article.component';
import {ExpressionDataSourcesArticleComponent} from './help-panel/articles/expression-data-sources-article/expression-data-sources-article.component';
import {PPIDataSourcesArticleComponent} from './help-panel/articles/ppidata-sources-article/ppidata-sources-article.component';
import {PathwayDataSourcesArticleComponent} from './help-panel/articles/pathway-data-sources-article/pathway-data-sources-article.component';
import {AffiliateLinkComponent} from './affiliate-link/affiliate-link.component';
import {DynamicPanelBaseComponent} from './dynamic-panel-base/dynamic-panel-base.component';
import {GoTermsEvidenceArticleComponent} from './help-panel/articles/go-terms-evidence-article/go-terms-evidence-article.component';
import {VennDiagramComponent} from './visualizations/venn-diagram/venn-diagram.component';
import {FieldSelectionDialogComponent} from './field-selection-dialog/field-selection-dialog.component';
import {ModelDetailsComponent} from './model-details/model-details.component';
import { UpsetPlotComponent } from './visualizations/upset-plot/upset-plot.component';
import { UpsetModule } from './visualizations/upset/upset.module';
import { UpsetFieldEditComponent } from './upset-field-edit/upset-field-edit.component';
import { HeatMapComponent } from './visualizations/heat-map/heat-map.component';
import { BatchResolveModalComponent } from './batch-resolve-modal/batch-resolve-modal.component';
import { SequenceAlignmentsComponent } from './visualizations/sequence-alignments/sequence-alignments.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { DataVersionCardComponent } from './data-version-card/data-version-card.component';
import { PredictionsPanelComponent } from './predictions-panel/predictions-panel.component';
import { PredictionDetailsCardComponent } from './predictions-panel/prediction-details-card/prediction-details-card.component';
import { PredictionSetComponent } from './predictions-panel/prediction-set/prediction-set.component';
import {AngularD3CloudModule} from 'angular-d3-cloud';
import {FilterPanelModule} from '../pharos-main/data-list/filter-panel/filter-panel.module';
import { DownloadCommunityDataButtonComponent } from './predictions-panel/download-community-data-button/download-community-data-button.component';
import {RadarChartComponent} from './visualizations/radar-chart/radar-chart.component';
import {GenericTableComponent} from './generic-table/generic-table.component';

@NgModule({
    declarations: [
        BatchUploadModalComponent,
        DynamicPanelBaseComponent,
        DynamicPanelComponent,
        DynamicTablePanelComponent,
        LinkListComponent,
        AssociationDataSourcesArticleComponent,
        ExpressionDataSourcesArticleComponent,
        PPIDataSourcesArticleComponent,
        PathwayDataSourcesArticleComponent,
        AffiliateLinkComponent,
        GoTermsEvidenceArticleComponent,
        VennDiagramComponent,
        FieldSelectionDialogComponent,
        ModelDetailsComponent,
        UpsetPlotComponent,
        UpsetFieldEditComponent,
        HeatMapComponent,
        BatchResolveModalComponent,
        SequenceAlignmentsComponent,
        TaskItemComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        NgxJsonViewerModule,
        UpsetModule,
        FilterPanelModule,
        AngularD3CloudModule,
        RadarChartComponent,
        ExploreListButtonComponent,
        GenericTableComponent,
        DownloadCommunityDataButtonComponent,
        PredictionDetailsCardComponent,
        StructureViewComponent,
        PredictionSetComponent,
        PredictionsPanelComponent,
        HelpPanelComponent,
        DataVersionCardComponent
    ],
    exports: [
        NcatsHeaderModule,
        BatchUploadModalComponent,
        DynamicPanelComponent,
        DynamicTablePanelComponent,
        LinkListComponent,
        AffiliateLinkComponent,
        VennDiagramComponent,
        UpsetPlotComponent,
        HeatMapComponent,
        SequenceAlignmentsComponent,
        TaskItemComponent
    ]
})
export class CommonToolsModule {
}
