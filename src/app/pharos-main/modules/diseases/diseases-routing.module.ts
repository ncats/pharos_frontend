import {RouterModule, Routes} from "@angular/router";
import {DataDetailsComponent} from "../../data-details/data-details.component";
import {DataDetailsResolver} from "../../data-details/data-details.resolver";
import {SharedModule} from "../../../shared/shared.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {DiseaseTableModule} from "../../data-list/tables/disease-table/disease-table.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {DiseaseDetailsModule} from "../../data-details/disease-details/disease-details.module";
import {NgModule} from "@angular/core";
import {NcatsHeaderModule} from "../../../tools/ncats-header/ncats-header.module";
import {PharosMainComponent} from "../../pharos-main.component";


const pharosDiseaseRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    loadChildren: () => import('../../../pharos-main/data-list/tables/disease-table/disease-table.module').then(m => m.DiseaseTableModule)
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
    SharedModule.forRoot(),
    CommonToolsModule,
    NcatsHeaderModule,
    SharedListModule,
    SharedDetailsModule,
    DiseaseTableModule,
    DiseaseDetailsModule,
    RouterModule.forChild(pharosDiseaseRoutes)

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
export class DiseasesRoutingModule {
}

