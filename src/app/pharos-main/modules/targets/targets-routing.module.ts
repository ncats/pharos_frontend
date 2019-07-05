import {RouterModule, Routes} from "@angular/router";
import {DataDetailsComponent} from "../../data-details/data-details.component";
import {DataDetailsResolver} from "../../data-details/data-details.resolver";
import {TargetDetailsModule} from "../../data-details/target-details/target-details.module";
import {SharedModule} from "../../../shared/shared.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {NgModule} from "@angular/core";
import {PharosMainComponent} from "../../pharos-main.component";

const pharosTargetsRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    loadChildren: () => import('../../../pharos-main/data-list/tables/target-table/target-table.module').then(m => {
      console.log("targets table module");
      return m.TargetTableModule
    })
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

