import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../shared/shared.module";
import {DataListResolver} from "../../data-list/data-list.resolver";
import {CommonModule} from "@angular/common";
import {DataListComponent} from "../../data-list/data-list.component";
import {SharedListModule} from "../../../shared/shared-list.module";

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
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    SharedListModule
  ],
  providers: [
    DataListResolver
  ],
  exports: [
    RouterModule
  ]
})

export class LigandListRoutingModule { }
