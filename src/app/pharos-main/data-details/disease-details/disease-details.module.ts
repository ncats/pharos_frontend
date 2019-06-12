import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IDG_LEVEL_TOKEN, TargetListPanelComponent} from "./target-list-panel/target-list-panel.component";
import {TOKENS} from "../../../../config/component-tokens";
import {DiseaseHeaderComponent} from "./disease-header/disease-header.component";
import {DiseaseDetailsComponent} from "./disease-details.component";
import {IdgLevelIndicatorComponent} from "../../../tools/idg-level-indicator/idg-level-indicator.component";
import {SharedModule} from "../../../shared/shared.module";
import {IdgLevelSummaryModule} from "../target-details/panels/level-summary-panel/idg-level-summary.module";
import {CommonToolsModule} from "../../../tools/common-tools.module";
import {SharedDetailsModule} from "../../../shared/shared-details.module";

@NgModule({
  declarations: [
    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule
  ],
  providers: [
    // diseases
    {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent},
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
    {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}

  ],
  entryComponents: [
    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent
  ]
})
export class DiseaseDetailsModule { }
