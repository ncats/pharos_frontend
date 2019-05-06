import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiseaseTableModule} from "./tables/disease-table/disease-table.module";
import {TargetTableModule} from "./tables/target-table/target-table.module";
import {SharedListModule} from "../../shared/shared-list.module";
import {DataListResolver} from "./data-list.resolver";
import {RouterModule, Routes} from "@angular/router";
import {DataListComponent} from "./data-list.component";
import {LigandTableModule} from "./tables/ligand-table/ligand-table.module";

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
  ],
  imports: [
    CommonModule,
    SharedListModule,
    DiseaseTableModule,
    TargetTableModule,
    LigandTableModule,
    RouterModule.forChild(pharosListRoutes)
  ],
  exports: [

  ]
})
export class DataListModule { }
