import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ApolloModule} from 'apollo-angular';
import {MaterialModule} from '../../assets/material/material.module';
import {BarChartComponent} from '../tools/visualizations/bar-chart/bar-chart.component';
import {
  HelpPanelTriggerComponent
} from '../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {ScrollspyDirective} from '../tools/sidenav-panel/directives/scrollspy.directive';
import {HelpArticlesModule} from './help-articles.module';
import {ScatterPlotComponent} from '../tools/visualizations/scatter-plot/scatter-plot.component';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {
  TargetRelevanceTableComponent
} from '../pharos-main/data-details/ligand-details/panels/target-relevance-panel/target-relevance-table/target-relevance-table.component';
import {RouterModule} from '@angular/router';
import {PackCircleComponent} from '../tools/visualizations/pack-circle/pack-circle.component';
import {TutorialLinkComponent} from '../tools/tutorial-link/tutorial-link.component';
import {ComponentHeaderComponent} from '../tools/component-header/component-header.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HelpArticlesModule,
    ClipboardModule,
    RouterModule,
    ApolloModule,
    ComponentHeaderComponent,
    HelpPanelTriggerComponent,
    TutorialLinkComponent,
    BarChartComponent,
    ScrollspyDirective,
    ScatterPlotComponent,
    PackCircleComponent
  ],
  declarations: [
    PharosMainComponent,
    TargetRelevanceTableComponent
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
    PharosMainComponent,
    TargetRelevanceTableComponent,
    ComponentHeaderComponent
  ]
})
export class SharedModule {
}
