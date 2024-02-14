import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelpPanelComponent} from './help-panel/help-panel.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {StructureViewComponent} from './structure-view/structure-view.component';
import {NcatsHeaderModule} from './ncats-header/ncats-header.module';
import {ExploreListButtonComponent} from './explore-list-button/explore-list-button.component';
import { DataVersionCardComponent } from './data-version-card/data-version-card.component';
import { PredictionsPanelComponent } from './predictions-panel/predictions-panel.component';
import { PredictionDetailsCardComponent } from './predictions-panel/prediction-details-card/prediction-details-card.component';
import { PredictionSetComponent } from './predictions-panel/prediction-set/prediction-set.component';
import {AngularD3CloudModule} from 'angular-d3-cloud';
import { DownloadCommunityDataButtonComponent } from './predictions-panel/download-community-data-button/download-community-data-button.component';
import {RadarChartComponent} from './visualizations/radar-chart/radar-chart.component';
import {GenericTableComponent} from './generic-table/generic-table.component';

@NgModule({
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
    ]
})
export class CommonToolsModule {
}
