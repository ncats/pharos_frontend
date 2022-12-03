import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LigandDetailsRoutingModule} from './ligand-details-routing.module';
import {LigandHeaderComponent} from '../../data-details/ligand-details/ligand-header/ligand-header.component';
import {TOKENS} from '../../../../config/component-tokens';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {TargetRelevancePanelComponent} from '../../data-details/ligand-details/panels/target-relevance-panel/target-relevance-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {LigandDetailsComponent} from '../../data-details/ligand-details/panels/ligand-details/ligand-details.component';
import {HelpPanelComponent} from "../../../tools/help-panel/help-panel.component";
import {PredictionsPanelComponent} from '../../../tools/predictions-panel/predictions-panel.component';

@NgModule({
  declarations: [
    LigandHeaderComponent,
    TargetRelevancePanelComponent,
    LigandDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LigandDetailsRoutingModule,
    SharedDetailsModule,
    CommonToolsModule
  ],
  providers: [
    // ligands
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
    {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
    {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
    {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
    {provide: TOKENS.IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}
  ]
})
export class LigandDetailsModule { }
