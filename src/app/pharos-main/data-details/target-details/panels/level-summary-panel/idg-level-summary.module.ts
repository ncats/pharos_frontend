import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOKENS} from '../../../../../../config/component-tokens';
import {LevelSummaryPanelComponent} from './level-summary-panel.component';
import {TclinSummaryComponent} from './levels/tclin-summary/tclin-summary.component';
import {TdarkSummaryComponent} from './levels/tdark-summary/tdark-summary.component';
import {TbioSummaryComponent} from './levels/tbio-summary/tbio-summary.component';
import {TchemSummaryComponent} from './levels/tchem-summary/tchem-summary.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';

@NgModule({
  declarations: [
    TdarkSummaryComponent,
    TbioSummaryComponent,
    TchemSummaryComponent,
    TclinSummaryComponent,
    LevelSummaryPanelComponent
  ],
  entryComponents: [
    LevelSummaryPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.LEVEL_SUMMARY_PANEL, useValue: LevelSummaryPanelComponent}
  ],
  exports: [
    LevelSummaryPanelComponent
  ]
})
export class IdgLevelSummaryModule { }
