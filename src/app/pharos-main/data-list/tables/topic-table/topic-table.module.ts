import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicTableComponent} from "./topic-table.component";
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CommonToolsModule} from "../../../../tools/common-tools.module";
import {TopicCardComponent} from "../../cards/topic-card/topic-card.component";
import {TOKENS} from "../../../../../config/component-tokens";
import {SharedListModule} from "../../../../shared/shared-list.module";
import {DataListResolver} from "../../data-list.resolver";
import {DataListComponent} from "../../data-list.component";

const pharosListRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  declarations: [
    TopicTableComponent,
    TopicCardComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pharosListRoutes),
    SharedModule,
    CommonToolsModule,
    SharedListModule
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
