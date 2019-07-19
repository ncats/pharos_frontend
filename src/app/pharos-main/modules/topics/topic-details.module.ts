import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicDetailsRoutingModule} from './topic-details-routing.module';
import {TopicHeaderComponent} from "../../data-details/topic-details/topic-header/topic-header.component";
import {TopicDetailsComponent} from "../../data-details/topic-details/topic-details.component";
import {TopicGraphPanelComponent} from "../../data-details/topic-details/panels/topic-graph-panel/topic-graph-panel.component";
import {TOKENS} from "../../../../config/component-tokens";
import {NodeDisplayComponent} from "../../data-details/topic-details/panels/node-display/node-display.component";
import {SharedModule} from "../../../shared/shared.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {IdgLevelSummaryModule} from "../../data-details/target-details/panels/level-summary-panel/idg-level-summary.module";
import {TargetTableModule} from "../targets/target-list.module";
import {LigandListModule} from "../ligands/ligand-list.module";
import {TopicDetailsResolver} from "../../resolvers/topic-details.resolver";
import {DiseaseListModule} from "../diseases/disease-list.module";
import {SmrtgraphCoreModule} from "smrtgraph-core";


@NgModule({
  declarations: [
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent,
    NodeDisplayComponent
  ],
  imports: [
    CommonModule,
    TopicDetailsRoutingModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule,
    TargetTableModule,
    LigandListModule,
    DiseaseListModule,
    SmrtgraphCoreModule,
    SharedModule.forRoot()
  ],
  providers: [
    TopicDetailsResolver,
    // topics
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent},
    {provide: TOKENS.TOPIC_HEADER_COMPONENT, useValue: TopicHeaderComponent},
    {provide: TOKENS.TOPIC_GRAPH_PANEL, useValue: TopicGraphPanelComponent},
  ],
  entryComponents: [
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent,
    NodeDisplayComponent
  ]

})
export class TopicDetailsModule { }
