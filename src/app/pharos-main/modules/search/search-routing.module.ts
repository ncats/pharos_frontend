import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchResultsResolver} from '../../resolvers/search-results.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

const pharosTargetsRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
        resolve: {
          search: SearchResultsResolver
      },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pharosTargetsRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule {
}

