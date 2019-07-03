import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TOKENS} from '../../../../../config/component-tokens';
import {IDG_LEVEL_TOKEN, RADAR_CHART_TOKEN, TargetTableComponent} from './target-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {TargetCardComponent} from '../../cards/target-card/target-card.component';
import {IdgLevelIndicatorComponent} from "../../../../tools/idg-level-indicator/idg-level-indicator.component";
import {InjectedRadarChartComponent} from './injected-radar-chart/injected-radar-chart.component';
import {TargetSaveModalComponent} from "./target-save-modal/target-save-modal.component";
import {DataListResolver} from "../../data-list.resolver";
import {DataListComponent} from "../../data-list.component";
import {SharedListModule} from "../../../../shared/shared-list.module";


const pharosListRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];


@NgModule({
  declarations: [
    TargetTableComponent,
    TargetCardComponent,
    InjectedRadarChartComponent,
    TargetSaveModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pharosListRoutes),
    SharedModule,
    CommonToolsModule,
    SharedListModule
  ],
  providers: [
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: RADAR_CHART_TOKEN, useValue: InjectedRadarChartComponent}
  ],
  entryComponents: [
    TargetTableComponent,
    IdgLevelIndicatorComponent,
    InjectedRadarChartComponent,
    TargetSaveModalComponent
  ],
  exports: [
    TargetTableComponent,
    TargetCardComponent
  ]
})
export class TargetTableModule { }
