import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsComponent} from "../../data-details/data-details.component";
import {TopicDetailsResolver} from "../../data-details/topic-details/topic-details.resolver";
import {SharedModule} from "../../../shared/shared.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {TopicDetailsModule} from "../../data-details/topic-details/topic-details.module";
import {TopicTableModule} from "../../data-list/tables/topic-table/topic-table.module";
import {DataListResolver} from "../../data-list/data-list.resolver";
import {DataListComponent} from "../../data-list/data-list.component";


const pharosTopicsRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../../pharos-main/data-list/tables/topic-table/topic-table.module').then(m => m.TopicTableModule)
  },
  {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: TopicDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    CommonToolsModule,
    SharedListModule,
    SharedDetailsModule,
    TopicDetailsModule,
    TopicTableModule,
    RouterModule.forChild(pharosTopicsRoutes)

  ],
  exports: [
    RouterModule
  ],
  providers: [
  ],
  entryComponents: [
  ],
  declarations: [
  ]
})
export class TopicsRoutingModule {
}

