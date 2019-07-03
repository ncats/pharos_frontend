import {RouterModule, Routes} from "@angular/router";
import {DataDetailsComponent} from "../../data-details/data-details.component";
import {TargetDetailsModule} from "../../data-details/target-details/target-details.module";
import {SharedModule} from "../../../shared/shared.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {NgModule} from "@angular/core";
import {SearchResultsResolver} from "../../data-list/search-results.resolver";
import {DiseaseTableModule} from "../../data-list/tables/disease-table/disease-table.module";
import {TopicTableModule} from "../../data-list/tables/topic-table/topic-table.module";
import {LigandTableModule} from "../../data-list/tables/ligand-table/ligand-table.module";
import {CommonModule} from "@angular/common";
import {TargetTableModule} from "../../data-list/tables/target-table/target-table.module";
import {DataListComponent} from "../../data-list/data-list.component";

const pharosTargetsRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
        resolve: {
          search: SearchResultsResolver
      }
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    CommonToolsModule,
    SharedListModule,
    SharedDetailsModule,
    RouterModule.forChild(pharosTargetsRoutes),
    // todo: these modules don't seem to be loading - no provider errors are thrown
    SharedListModule,
    DiseaseTableModule,
    TargetTableModule,
    LigandTableModule,
    TopicTableModule

  ],
  exports: [
    RouterModule
  ],
  providers: [
    SearchResultsResolver
  ],
  entryComponents: [
  ],
  declarations: [
  ]
})
export class SearchRoutingModule {
}

