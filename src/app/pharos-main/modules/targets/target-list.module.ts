import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TargetListRoutingModule} from './target-list-routing.module';
import {IDG_LEVEL_TOKEN, RADAR_CHART_TOKEN, TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {TargetCardComponent} from '../../data-list/cards/target-card/target-card.component';
import {LongTargetCardComponent} from '../../data-list/cards/long-target-card/long-target-card.component';
import {InjectedRadarChartComponent} from '../../data-list/tables/target-table/injected-radar-chart/injected-radar-chart.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TOKENS} from '../../../../config/component-tokens';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TopicSaveModalComponent} from '../../data-list/tables/target-table/topic-save-modal/topic-save-modal.component';
import {GeneDetailsComponent} from '../../data-list/cards/long-target-card/gene-details/gene-details.component';
import {InteractionDetailsComponent} from '../../data-list/cards/long-target-card/interaction-details/interaction-details.component';
import {KnowledgeMetricsComponent} from '../../data-list/cards/long-target-card/knowledge-metrics/knowledge-metrics.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {DiseaseAssociationDetailsComponent} from '../../data-list/cards/long-target-card/disease-association-details/disease-association-details.component';
import {SimilarityDetailsComponent} from '../../data-list/cards/long-target-card/similarity-details/similarity-details.component';
import {LigandAssociationDetailsComponent} from '../../data-list/cards/long-target-card/ligand-association-details/ligand-association-details.component';
import {TargetPredictionDetailsComponent} from '../../data-list/cards/long-target-card/target-prediction-details/target-prediction-details.component';
import {SequenceSimilarityDetailsComponent} from '../../data-list/cards/long-target-card/sequence-similarity-details/sequence-similarity-details.component';

@NgModule({
  declarations: [
    TargetTableComponent,
    TargetCardComponent,
    LongTargetCardComponent,
    GeneDetailsComponent,
    InteractionDetailsComponent,
    SequenceSimilarityDetailsComponent,
    DiseaseAssociationDetailsComponent,
    SimilarityDetailsComponent,
    KnowledgeMetricsComponent,
    LigandAssociationDetailsComponent,
    TargetPredictionDetailsComponent,
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
    DiseaseAssociationDetailsComponent,
    SimilarityDetailsComponent,
    KnowledgeMetricsComponent,
    LigandAssociationDetailsComponent,
    TargetPredictionDetailsComponent
  ]
})
export class TargetTableModule { }
