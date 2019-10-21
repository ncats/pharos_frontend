import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {DataListComponent} from '../../data-list/data-list.component';

const routes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      targets: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetListRoutingModule { }
