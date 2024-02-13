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
import {AffiliateLinkComponent} from './affiliate-link/affiliate-link.component';
import {DynamicPanelBaseComponent} from './dynamic-panel-base/dynamic-panel-base.component';
import {FieldSelectionDialogComponent} from './field-selection-dialog/field-selection-dialog.component';
import {ModelDetailsComponent} from './model-details/model-details.component';
import { BatchResolveModalComponent } from './batch-resolve-modal/batch-resolve-modal.component';
import { DataVersionCardComponent } from './data-version-card/data-version-card.component';
import { PredictionsPanelComponent } from './predictions-panel/predictions-panel.component';
import { PredictionDetailsCardComponent } from './predictions-panel/prediction-details-card/prediction-details-card.component';
import { PredictionSetComponent } from './predictions-panel/prediction-set/prediction-set.component';
import {AngularD3CloudModule} from 'angular-d3-cloud';
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
        AffiliateLinkComponent,
        FieldSelectionDialogComponent,
        ModelDetailsComponent,
        BatchResolveModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        NgxJsonViewerModule,
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
        AffiliateLinkComponent
    ]
})
export class CommonToolsModule {
}
