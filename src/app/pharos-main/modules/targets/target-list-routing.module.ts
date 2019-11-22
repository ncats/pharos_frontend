import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Target, TargetSerializer} from '../../../models/target';
import {PharosMainComponent} from '../../pharos-main.component';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    data: {
      fragments: Target.targetListFragments,
      serializer: new TargetSerializer()
    },
    resolve: {
      components: ComponentsResolver,
      results: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetListRoutingModule { }
