import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from '../../pharos-main.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {BrowseResolver} from '../../resolvers/browse.resolver';



const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      results: BrowseResolver,
      components: ComponentsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule { }
