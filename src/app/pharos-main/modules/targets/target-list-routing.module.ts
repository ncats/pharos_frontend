import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Target, TargetSerializer} from '../../../models/target';
import {PharosMainComponent} from '../../pharos-main.component';
import {Facet} from '../../../models/facet';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    data: {
      fragments: {
        list: Target.targetListFragments,
        facets: Facet.facetFieldsFragments
      },
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
