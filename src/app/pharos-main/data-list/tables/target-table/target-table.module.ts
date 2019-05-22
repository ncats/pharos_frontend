import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TOKENS} from '../../../../../config/component-tokens';
import {IDG_LEVEL_TOKEN, RADAR_CHART_TOKEN, TargetTableComponent} from './target-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {TargetCardComponent} from '../../cards/target-card/target-card.component';
import {IdgLevelIndicatorComponent} from "../../../../tools/idg-level-indicator/idg-level-indicator.component";
import {InjectedRadarChartComponent} from './injected-radar-chart/injected-radar-chart.component';

@NgModule({
  declarations: [
    TargetTableComponent,
    // todo target card should probably be its own module
    TargetCardComponent,
    InjectedRadarChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: RADAR_CHART_TOKEN, useValue: InjectedRadarChartComponent}
  ],
  entryComponents: [
    TargetTableComponent,
    IdgLevelIndicatorComponent,
    InjectedRadarChartComponent
  ],
  exports: [
    TargetTableComponent,
    TargetCardComponent
  ]
})
export class TargetTableModule { }
