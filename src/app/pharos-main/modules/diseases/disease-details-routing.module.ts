import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';
import {Disease, DiseaseSerializer} from '../../../models/disease';
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
        details: Disease.diseaseListFragments,
        query: Disease.diseaseDetailsQuery
      },
      serializer: new DiseaseSerializer()
    },
  //  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseDetailsRoutingModule { }
