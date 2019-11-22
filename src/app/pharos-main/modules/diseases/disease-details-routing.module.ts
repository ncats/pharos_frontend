import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseDetailsRoutingModule { }
