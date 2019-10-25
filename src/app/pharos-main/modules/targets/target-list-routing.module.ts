import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {DataListComponent} from '../../data-list/data-list.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Target, TargetSerializer} from '../../../models/target';

const routes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      components: ComponentsResolver,
      results: DataListResolver
    },
    data: {
      fragments: Target.listfragments,
      serializer: new TargetSerializer()
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetListRoutingModule { }
