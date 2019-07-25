import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataDetailsComponent} from '../../data-details/data-details.component';
import {TopicDetailsResolver} from '../../resolvers/topic-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: TopicDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicDetailsRoutingModule { }
