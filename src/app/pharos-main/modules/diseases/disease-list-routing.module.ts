import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListComponent} from '../../data-list/data-list.component';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Disease} from '../../../models/disease';

const routes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      components: ComponentsResolver,
      results: DataListResolver
    },
    data: {
      fragments: Disease.fragments.listFields
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
