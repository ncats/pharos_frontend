import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Disease, DiseaseSerializer} from '../../../models/disease';
import {PharosMainComponent} from '../../pharos-main.component';
import {Facet} from '../../../models/facet';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    data: {
      fragments: {
        list: Disease.diseaseListFragments,
        facets: Facet.facetFieldsFragments
      },
      serializer: new DiseaseSerializer()
    },
    resolve: {
      components: ComponentsResolver,
      results: DataListResolver
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
