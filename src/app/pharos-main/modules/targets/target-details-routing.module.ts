import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {DataDetailsComponent} from '../../data-details/data-details.component';
import {Target} from '../../../models/target';

const routes: Routes = [
  {
    path: '',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    data: {
      fragments: Target.detailsfragments
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
