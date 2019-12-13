import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {Target, TargetSerializer} from '../../../models/target';
import {PharosMainComponent} from '../../pharos-main.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      results: DataDetailsResolver,
      components: ComponentsResolver
    },
    data: {
      fragments: {
        details: Target.targetDetailsFragments,
        query: Target.targetDetailsQuery
      },
      serializer: new TargetSerializer()
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetDetailsRoutingModule { }
