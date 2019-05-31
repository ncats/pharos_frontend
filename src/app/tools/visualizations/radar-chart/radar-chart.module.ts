import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RadarService} from './radar.service';
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
    RadarService
  ],
  exports: [
    RadarChartComponent
  ]
})
export class RadarChartModule { }
