import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOKENS} from "../../../../config/component-tokens";
import {TopicDetailsComponent} from "./topic-details.component";
import {TopicHeaderComponent} from "./topic-header/topic-header.component";
import {TopicGraphPanelComponent} from "./panels/topic-graph-panel/topic-graph-panel.component";
import {SharedModule} from "../../../shared/shared.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {TargetTableModule} from "../../data-list/tables/target-table/target-table.module";

@NgModule({
  declarations: [
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedDetailsModule,
    TargetTableModule
  ],
  providers: [
    // topics
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent},
    {provide: TOKENS.TOPIC_HEADER_COMPONENT, useValue: TopicHeaderComponent},
    {provide: TOKENS.TOPIC_GRAPH_PANEL, useValue: TopicGraphPanelComponent},
  ],
  entryComponents: [
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent
  ]

})
export class TopicDetailsModule { }
