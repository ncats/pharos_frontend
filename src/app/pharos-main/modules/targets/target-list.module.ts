import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TargetListRoutingModule} from './target-list-routing.module';
import {RADAR_CHART_TOKEN, TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {InjectedRadarChartComponent} from '../../data-list/tables/target-table/injected-radar-chart/injected-radar-chart.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TOKENS} from '../../../../config/component-tokens';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TopicSaveModalComponent} from '../../data-list/tables/target-table/topic-save-modal/topic-save-modal.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {
  PropertyDisplayComponent
} from '../../../tools/generic-table/components/property-display/property-display.component';
import {RadarChartComponent} from '../../../tools/visualizations/radar-chart/radar-chart.component';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';
import {LongTargetCardComponent} from '../../data-list/cards/long-target-card/long-target-card.component';

@NgModule({
  declarations: [
    TargetTableComponent,
    InjectedRadarChartComponent,
    TopicSaveModalComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        TargetListRoutingModule,
        CommonToolsModule,
        SharedListModule,
        PropertyDisplayComponent,
        RadarChartComponent,
        StructureViewComponent,
        LongTargetCardComponent
    ],
  providers: [
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: TOKENS.IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: RADAR_CHART_TOKEN, useValue: InjectedRadarChartComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent}
  ],
  exports: [
    TargetTableComponent
  ]
})
export class TargetTableModule { }
