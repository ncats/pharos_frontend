import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TargetListRoutingModule} from './target-list-routing.module';
import {IDG_LEVEL_TOKEN, RADAR_CHART_TOKEN, TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {TargetCardComponent} from '../../data-list/cards/target-card/target-card.component';
import {LongTargetCardComponent} from "../../data-list/cards/long-target-card/long-target-card.component";
import {InjectedRadarChartComponent} from '../../data-list/tables/target-table/injected-radar-chart/injected-radar-chart.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TOKENS} from '../../../../config/component-tokens';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TopicSaveModalComponent} from '../../data-list/tables/target-table/topic-save-modal/topic-save-modal.component';
import {GeneDetailsComponent} from "../../data-list/cards/long-target-card/gene-details/gene-details.component";
import {InteractionDetailsComponent} from "../../data-list/cards/long-target-card/interaction-details/interaction-details.component";
import {KnowledgeMetricsComponent} from "../../data-list/cards/long-target-card/knowledge-metrics/knowledge-metrics.component";
import {HelpPanelComponent} from "../../../tools/help-panel/help-panel.component";

@NgModule({
  declarations: [
    TargetTableComponent,
    TargetCardComponent,
    LongTargetCardComponent,
    GeneDetailsComponent,
    InteractionDetailsComponent,
    KnowledgeMetricsComponent,
    InjectedRadarChartComponent,
    TopicSaveModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TargetListRoutingModule,
    CommonToolsModule,
    SharedListModule
  ],
  providers: [
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: RADAR_CHART_TOKEN, useValue: InjectedRadarChartComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent}
  ],
  exports: [
    TargetTableComponent,
    TargetCardComponent,
    LongTargetCardComponent,
    GeneDetailsComponent,
    InteractionDetailsComponent,
    KnowledgeMetricsComponent
  ]
})
export class TargetTableModule { }
