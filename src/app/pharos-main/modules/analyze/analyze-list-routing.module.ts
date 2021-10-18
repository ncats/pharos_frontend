import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {PharosMainComponent} from '../../pharos-main.component';
import {Facet} from '../../../models/facet';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {Target, TargetSerializer} from '../../../models/target';
import {Disease} from '../../../models/disease';
import {Ligand} from '../../../models/ligand';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      results: DataListResolver,
      components: ComponentsResolver
    },
    data: {
      fragments: {
        targets: {
          list: Target.targetListFragments,
          extras: Target.targetListExtras
        },
        diseases: {
          list: Disease.diseaseListFragments,
        },
        ligands: {
          list: Ligand.ligandListFragments
        },
        facets: Facet.facetFieldsFragments,
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
export class AnalyzeListRoutingModule {
}
