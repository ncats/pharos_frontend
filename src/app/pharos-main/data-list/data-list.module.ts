import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiseaseTableModule} from './tables/disease-table/disease-table.module';
import {TargetTableModule} from './tables/target-table/target-table.module';
import {SharedListModule} from '../../shared/shared-list.module';
import {DataListResolver} from './data-list.resolver';
import {RouterModule, Routes} from '@angular/router';
import {DataListComponent} from './data-list.component';
import {LigandTableModule} from './tables/ligand-table/ligand-table.module';
import {SearchResultsResolver} from "./search-results.resolver";
import {TopicTableModule} from "./tables/topic-table/topic-table.module";

const pharosListRoutes: Routes = [
  {
   path: '',
  pathMatch: 'full',
  component: DataListComponent,
    resolve: {
      data: DataListResolver,
      search: SearchResultsResolver
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
    // todo: these modules don't seem to be loading - no provider errors are thrown
    DiseaseTableModule,
    TargetTableModule,
    LigandTableModule,
    TopicTableModule,
    RouterModule.forChild(pharosListRoutes)
  ],
  exports: [

  ]
})
export class DataListModule { }
