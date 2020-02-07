import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseDetailsRoutingModule } from './disease-details-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {
  IDG_LEVEL_TOKEN,
  TargetListPanelComponent
} from '../../data-details/disease-details/target-list-panel/target-list-panel.component';
import {TOKENS} from '../../../../config/component-tokens';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {DiseaseHeaderComponent} from '../../data-details/disease-details/disease-header/disease-header.component';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';

@NgModule({
  declarations: [
    DiseaseHeaderComponent,
    TargetListPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedDetailsModule,
    DiseaseDetailsRoutingModule
  ],
  providers: [
    // diseases
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
    {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}
  ]
})
export class DiseaseDetailsModule { }
