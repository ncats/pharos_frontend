import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../shared/shared.module";
import {TOKENS} from "../../../../config/component-tokens";
import {DataListResolver} from "../../data-list/data-list.resolver";
import {CommonModule} from "@angular/common";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {DiseaseTableComponent} from "../../data-list/tables/disease-table/disease-table.component";
import {DataListComponent} from "../../data-list/data-list.component";

const routes: Routes = [
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
    DiseaseTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    CommonToolsModule,
    SharedListModule
  ],
  providers: [
    DataListResolver,
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
  ],
  entryComponents: [
    DiseaseTableComponent
  ],
  exports: [
    DiseaseTableComponent
  ]
})
export class DiseaseListRoutingModule { }
