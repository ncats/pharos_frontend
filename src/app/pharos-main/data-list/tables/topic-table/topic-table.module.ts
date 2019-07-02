import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicTableComponent} from "./topic-table.component";
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {CommonToolsModule} from "../../../../tools/common-tools.module";
import {TopicCardComponent} from "../../cards/topic-card/topic-card.component";
import {TOKENS} from "../../../../../config/component-tokens";

@NgModule({
  declarations: [
    TopicTableComponent,
    TopicCardComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent},
  ],
  entryComponents: [
    TopicTableComponent,
    TopicCardComponent
  ],
  exports: [
    TopicTableComponent,
    TopicCardComponent
  ]
})
export class TopicTableModule { }
