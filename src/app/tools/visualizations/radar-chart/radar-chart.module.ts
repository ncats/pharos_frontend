import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RadarChartComponent} from './radar-chart.component';
import {RadarService} from './radar.service';

@NgModule({
  declarations: [
    RadarChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    RadarService
  ],
  exports: [
    RadarChartComponent
  ]
})
export class RadarChartModule { }
