import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {DataDetailsComponent} from '../../data-details/data-details.component';
import {Target, TargetSerializer} from '../../../models/target';
import {PharosMainComponent} from '../../pharos-main.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {DataListResolver} from '../../resolvers/data-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      results: DataDetailsResolver,
      components: ComponentsResolver
    },
    data: {
      fragments: Target.targetDetailsFragments,
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
