import {NgModule} from '@angular/core';
import {TopicTableComponent} from "./topic-table.component";
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CommonToolsModule} from "../../../../tools/common-tools.module";
import {TopicCardComponent} from "../../cards/topic-card/topic-card.component";
import {TOKENS} from "../../../../../config/component-tokens";
import {SharedListModule} from "../../../../shared/shared-list.module";
import {DataListComponent} from "../../data-list.component";
import {TopicsListResolver} from "../../topics-list.resolver";

const pharosListRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      search: TopicsListResolver
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
    SharedModule,
    CommonToolsModule,
    SharedListModule,
    RouterModule.forChild(pharosListRoutes)
  ],
  providers: [
    TopicsListResolver,
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
