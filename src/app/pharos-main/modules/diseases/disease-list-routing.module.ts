import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListComponent} from '../../data-list/data-list.component';
import {DataListResolver} from '../../resolvers/data-list.resolver';

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
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseListRoutingModule { }
