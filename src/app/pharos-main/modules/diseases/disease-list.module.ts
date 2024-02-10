import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiseaseListRoutingModule} from './disease-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {TOKENS} from '../../../../config/component-tokens';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedListModule} from '../../../shared/shared-list.module';
import {DiseaseTableComponent} from '../../data-list/tables/disease-table/disease-table.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    DiseaseListRoutingModule,
    SharedListModule
  ],
  providers: [
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
  ]
})
export class DiseaseListModule { }
