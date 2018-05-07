import { NgModule } from '@angular/core';
import {TopicHeaderComponent} from "./topic-details/topic-header/topic-header.component";
import {TopicDetailsComponent} from "./topic-details/topic-details.component";
import {TopicTableComponent} from "./topic-table/topic-table.component";
import {TOPIC_DETAILS_COMPONENT, TOPIC_TABLE_COMPONENT} from "../../environments/environment.prod";
import {SharedModule} from "../shared/shared.module";
import {DataListResolver} from "../pharos-main/services/data-list.resolver";
import {DataDetailsComponent} from "../pharos-main/data-details/data-details.component";
import {PharosMainComponent} from "../pharos-main/pharos-main.component";
import {DataDetailsResolver} from "../pharos-main/services/data-details.resolver";
import {RouterModule, Routes} from "@angular/router";
import {BreadcrumbComponent} from "../tools/breadcrumb/breadcrumb.component";
import {NcatsHeaderComponent} from "../tools/ncats-header/ncats-header.component";
import {NcatsFooterComponent} from "../tools/ncats-footer/ncats-footer.component";
import {SharedListModule} from "../shared/shared-list.module";
import {SharedDetailsModule} from "../shared/shared-details.module";

const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }, {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    SharedModule,
    SharedListModule,
    SharedDetailsModule,
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[
    // topics
    { provide: TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
    { provide: TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
  ],
  entryComponents: [
    TopicDetailsComponent,
    TopicHeaderComponent
  ],
  declarations: [
    TopicDetailsComponent,
    TopicHeaderComponent
  ]
})
export class PharosTopicsModule { }
