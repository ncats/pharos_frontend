import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicDetailsResolver} from '../../resolvers/topic-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
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
