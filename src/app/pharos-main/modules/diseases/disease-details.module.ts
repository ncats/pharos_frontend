import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseDetailsRoutingModule } from './disease-details-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {TOKENS} from '../../../../config/component-tokens';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {DiseaseSummaryComponent} from '../../data-details/disease-details/disease-summary/disease-summary.component';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {DoBrowserComponent} from '../../data-details/disease-details/do-browser/do-browser.component';
import {TinxDiseaseComponent} from '../../data-details/disease-details/tinx/tinx-disease.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {GwasDiseaseAnalyticsComponent} from '../../data-details/disease-details/gwas-disease-analytics/gwas-disease-analytics.component';
import {SidenavPanelComponent} from '../../../tools/sidenav-panel/sidenav-panel.component';
import {DiseaseHeaderComponent} from '../../data-details/disease-details/disease-header/disease-header.component';
import {PredictionsPanelComponent} from '../../../tools/predictions-panel/predictions-panel.component';

@NgModule({
  declarations: [
    DiseaseHeaderComponent,
    DiseaseSummaryComponent,
    DoBrowserComponent,
    TinxDiseaseComponent,
    GwasDiseaseAnalyticsComponent
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
    {provide: TOKENS.PHAROS_SUBNAV_COMPONENT, useValue: SidenavPanelComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
    {provide: TOKENS.DISEASE_SUMMARY_COMPONENT, useValue: DiseaseSummaryComponent},
    {provide: TOKENS.DISEASE_DO_BROWSER_COMPONENT, useValue: DoBrowserComponent},
    {provide: TOKENS.IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: TOKENS.DISEASE_TINX_COMPONENT, useValue: TinxDiseaseComponent},
    {provide: TOKENS.DISEASE_GWAS_ANALYTICS_COMPONENT, useValue: GwasDiseaseAnalyticsComponent}
  ]
})
export class DiseaseDetailsModule { }
