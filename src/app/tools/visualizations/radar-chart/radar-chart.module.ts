import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RadarChartComponent} from './radar-chart.component';

@NgModule({
  declarations: [
    RadarChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
  ],
  exports: [
    RadarChartComponent
  ]
})
export class RadarChartModule { }
