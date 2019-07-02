import {RouterModule, Routes} from "@angular/router";
import {PharosMainComponent} from "../../pharos-main.component";
import {DataDetailsComponent} from "../../data-details/data-details.component";
import {DataDetailsResolver} from "../../data-details/data-details.resolver";
import {TargetDetailsModule} from "../../data-details/target-details/target-details.module";
import {SharedModule} from "../../../shared/shared.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {NgModule} from "@angular/core";
import {NcatsHeaderModule} from "../../../tools/ncats-header/ncats-header.module";

const pharosTargetsRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../../pharos-main/data-list/data-list.module').then(m => m.DataListModule)
  },
  {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    TargetDetailsModule,
    SharedModule.forRoot(),
    CommonToolsModule,
    SharedListModule,
    SharedDetailsModule,
    NcatsHeaderModule,
    RouterModule.forChild(pharosTargetsRoutes)

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
export class TargetsRoutingModule {
}

