import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [
    DataListResolver
  ],
  exports: [
    RouterModule
  ]
})

export class LigandListRoutingModule { }
