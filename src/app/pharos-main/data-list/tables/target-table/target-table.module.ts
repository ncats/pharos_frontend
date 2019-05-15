import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TOKENS} from '../../../../../config/component-tokens';
import {TargetTableComponent} from './target-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {TargetCardComponent} from '../../cards/target-card/target-card.component';

@NgModule({
  declarations: [
    TargetTableComponent,
    // todo target card should probably be its own module
    TargetCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent}
  ],
  entryComponents: [
    TargetTableComponent
  ],
  exports: [
    TargetTableComponent,
    TargetCardComponent
  ]
})
export class TargetTableModule { }
