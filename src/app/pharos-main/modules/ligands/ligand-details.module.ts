import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LigandDetailsRoutingModule} from './ligand-details-routing.module';
import {LigandDescriptionComponent} from '../../data-details/ligand-details/panels/ligand-description/ligand-description.component';
import {LigandHeaderComponent} from '../../data-details/ligand-details/ligand-header/ligand-header.component';
import {TOKENS} from '../../../../config/component-tokens';
import {SynonymsPanelComponent} from '../../data-details/ligand-details/panels/synonyms-panel/synonyms-panel.component';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {TargetRelevancePanelComponent} from '../../data-details/ligand-details/panels/target-relevance-panel/target-relevance-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {StructureViewPanelComponent} from '../../data-details/ligand-details/panels/structure-view-panel/structure-view-panel.component';
import {MolecularDefinitionPanelComponent} from '../../data-details/ligand-details/panels/molecular-definition-panel/molecular-definition-panel.component';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {LigandDetailsComponent} from '../../data-details/ligand-details/ligand-details.component';
import {IDG_LEVEL_TOKEN} from '../../data-details/disease-details/target-list-panel/target-list-panel.component';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';

@NgModule({
  declarations: [
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    TargetRelevancePanelComponent,
    LigandDescriptionComponent,
    MolecularDefinitionPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    LigandDetailsRoutingModule,
    SharedDetailsModule,
    CommonToolsModule
  ],
  providers: [
    // ligands
    {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
    {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
    {provide: TOKENS.SYNONYMS_PANEL, useValue: SynonymsPanelComponent},
    {provide: TOKENS.STRUCTURE_VIEW_PANEL, useValue: StructureViewPanelComponent},
    {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
    {provide: TOKENS.MOLECULAR_DEFINITION_PANEL, useValue: MolecularDefinitionPanelComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}
  ],
  entryComponents: [
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    LigandDescriptionComponent,
    TargetRelevancePanelComponent,
    MolecularDefinitionPanelComponent
  ]
})
export class LigandDetailsModule { }
