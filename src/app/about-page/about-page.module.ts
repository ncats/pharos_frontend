import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AboutPageComponent} from "./about-page.component";
import {SharedModule} from "../shared/shared.module";
import {CommonToolsModule} from "../tools/common-tools.module";
import {PharosApiService} from "../pharos-services/pharos-api.service";
import {DataSourceSerializer} from "../models/dataSource";
import {QueryResolver} from "../pharos-main/resolvers/query.resolver";

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
    resolve: {
      results: QueryResolver
    },
    data: {
      fragments: {
        query: PharosApiService.dataSourceQuery
      },
      serializer: new DataSourceSerializer(),
      rootObject: "dataSourceCounts"
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, SharedModule, CommonToolsModule
  ], providers: [QueryResolver]
})
export class AboutPageModule {
}
