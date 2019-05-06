import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TargetTableModule} from "../../data-list/tables/target-table/target-table.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedModule} from "../../../shared/shared.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {IdgLevelSummaryModule} from "../target-details/panels/level-summary-panel/idg-level-summary.module";
import {LigandTableComponent} from "../../data-list/tables/ligand-table/ligand-table.component";
import {MolecularDefinitionPanelComponent} from "./molecular-definition-panel/molecular-definition-panel.component";
import {LigandDetailsComponent} from "./ligand-details.component";
import {TOKENS} from "../../../../config/component-tokens";
import {TargetRelevancePanelComponent} from "./target-relevance-panel/target-relevance-panel.component";
import {LigandHeaderComponent} from "./ligand-header/ligand-header.component";
import {SynonymsPanelComponent} from "./synonyms-panel/synonyms-panel.component";
import {StructureViewPanelComponent} from "./structure-view-panel/structure-view-panel.component";
import {LigandTableModule} from "../../data-list/tables/ligand-table/ligand-table.module";

@NgModule({
  declarations: [
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    TargetRelevancePanelComponent,
    MolecularDefinitionPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule,
    TargetTableModule,
    LigandTableModule
  ],
  providers: [
    // ligands
    {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
    {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
    {provide: TOKENS.SYNONYMS_PANEL, useValue: SynonymsPanelComponent},
    {provide: TOKENS.STRUCTURE_VIEW_PANEL, useValue: StructureViewPanelComponent},
    {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
    {provide: TOKENS.MOLECULAR_DEFINITION_PANEL, useValue: MolecularDefinitionPanelComponent},
  ],
  entryComponents: [
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    TargetRelevancePanelComponent,
    MolecularDefinitionPanelComponent
  ]
})
export class LigandDetailsModule { }
