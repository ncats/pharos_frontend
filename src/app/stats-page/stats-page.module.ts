import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {CommonToolsModule} from '../tools/common-tools.module';
import {StatsPageComponent} from './stats-page.component';
import {QueryResolver} from '../pharos-main/resolvers/query.resolver';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {StatsSerializer} from '../models/stats';

const routes: Routes = [
  {
    path: '',
    component: StatsPageComponent,
    resolve: {
      results: QueryResolver
    },
    data: {
      fragments: {
        query: PharosApiService.statsQuery
      },
      serializer: new StatsSerializer()
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [QueryResolver]
})
export class StatsPageModule { }
