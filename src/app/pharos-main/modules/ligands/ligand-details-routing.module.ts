import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

import {Ligand, LigandSerializer} from '../../../models/ligand';
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
        details: Ligand.ligandDetailsFragments,
        query: Ligand.ligandDetailsQuery
      },
      serializer: new LigandSerializer()
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LigandDetailsRoutingModule { }
