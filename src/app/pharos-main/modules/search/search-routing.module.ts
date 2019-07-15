import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SearchResultsResolver} from "../../data-list/search-results.resolver";
import {DataListComponent} from "../../data-list/data-list.component";

const pharosTargetsRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
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

