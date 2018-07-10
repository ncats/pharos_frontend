import { NgModule } from '@angular/core';
import {PharosMainRoutingModule} from './pharos-main-routing.module';
import { StructureViewPanelComponent } from './data-details/ligand-details/structure-view-panel/structure-view-panel.component';
import { SynonymsPanelComponent } from './data-details/ligand-details/synonyms-panel/synonyms-panel.component';
import { MolecularDefinitionPanelComponent } from './data-details/ligand-details/molecular-definition-panel/molecular-definition-panel.component';
import { TargetRelevancePanelComponent } from './data-details/ligand-details/target-relevance-panel/target-relevance-panel.component';
import { LigandDetailsComponent } from './data-details/ligand-details/ligand-details.component';
import { LigandHeaderComponent } from './data-details/ligand-details/ligand-header/ligand-header.component';
import { DiseaseHeaderComponent } from './data-details/disease-details/disease-header/disease-header.component';
import { TargetListPanelComponent } from './data-details/disease-details/target-list-panel/target-list-panel.component';

@NgModule({
  imports: [
    PharosMainRoutingModule
  ]
})
export class PharosMainModule { }
