import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../assets/material/material.module';
import {BarChartComponent} from '../tools/visualizations/bar-chart/bar-chart.component';
import {HelpPanelTriggerComponent} from '../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {ScrollspyDirective} from '../tools/sidenav-panel/directives/scrollspy.directive';
import {HelpArticlesModule} from './help-articles.module';
import {ScatterPlotComponent} from '../tools/visualizations/scatter-plot/scatter-plot.component';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HelpArticlesModule
  ],
  declarations: [
    BarChartComponent,
    HelpPanelTriggerComponent,
    ScrollspyDirective,
    ScatterPlotComponent,
    PharosMainComponent
  ],
  providers: [
    HelpDataService,
    HelpPanelOpenerService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HelpArticlesModule,
    BarChartComponent,
    HelpPanelTriggerComponent,
    ScrollspyDirective,
    ScatterPlotComponent,
    PharosMainComponent
  ]
})
export class SharedModule {}
