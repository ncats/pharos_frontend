import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOKENS} from '../../../../../../config/component-tokens';
import {LevelSummaryPanelComponent} from './level-summary-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CommonToolsModule,
        RouterModule
    ],
  providers: [
    {provide: TOKENS.LEVEL_SUMMARY_PANEL, useValue: LevelSummaryPanelComponent}
  ]
})
export class IdgLevelSummaryModule { }
