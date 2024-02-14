import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from '../../pharos-main.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {SearchResolver} from '../../resolvers/search.resolver';
import {TOKENS} from '../../../../config/component-tokens';
import {SearchPageComponent} from '../../search/search-component/search-page.component';
import {FilterPanelComponent} from '../../data-list/filter-panel/filter-panel.component';
import {SelectedFacetListComponent} from '../../data-list/selected-facet-list/selected-facet-list.component';



const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      results: SearchResolver,
      components: ComponentsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TOKENS.BROWSE_TABLE_COMPONENT, useValue: SearchPageComponent}
  ]
})
export class SearchRoutingModule { }
