import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedListModule} from "../../../shared/shared-list.module";
import {SharedModule} from "../../../shared/shared.module";
import {TargetTableModule} from "../targets/target-list.module";
import {DiseaseListModule} from "../diseases/disease-list.module";
import {LigandListModule} from "../ligands/ligand-list.module";
import {TOKENS} from "../../../../config/component-tokens";
import {TargetTableComponent} from "../../data-list/tables/target-table/target-table.component";
import {SearchResultsResolver} from "../../resolvers/search-results.resolver";
import {LigandTableComponent} from "../../data-list/tables/ligand-table/ligand-table.component";
import {DiseaseTableComponent} from "../../data-list/tables/disease-table/disease-table.component";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    SearchRoutingModule,
    CommonToolsModule,
    SharedListModule,
    TargetTableModule,
    DiseaseListModule,
    LigandListModule
  ],
  providers: [
    SearchResultsResolver,
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent},
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
  ],
  entryComponents: [
  ],
})
export class SearchModule { }
