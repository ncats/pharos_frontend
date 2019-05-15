import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TOKENS} from '../../../../../config/component-tokens';
import {SharedModule} from '../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {DiseaseTableComponent} from './disease-table.component';

@NgModule({
  declarations: [
    DiseaseTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
  ],
  entryComponents: [
    DiseaseTableComponent
  ],
  exports: [
    DiseaseTableComponent
  ]
})
export class DiseaseTableModule { }
