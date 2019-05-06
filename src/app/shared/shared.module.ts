///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponent} from '../tools/search-component/search.component';
import {HighlightPipe} from '../tools/search-component/highlight.pipe';
import {MaterialModule} from '../../assets/material/material.module';
import {ScrollToTopComponent} from '../tools/scroll-to-top/scroll-to-top.component';
import {CustomContentDirective} from '../tools/custom-content.directive';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {TermDisplayComponent} from '../tools/term-display/term-display.component';
import {ToiCardComponent} from '../pharos-home/toi-card/toi-card.component';
import {NcatsHeaderComponent} from '../tools/ncats-header/ncats-header.component';
import {BarChartComponent} from '../tools/visualizations/bar-chart/bar-chart.component';
import {PharosFooterComponent} from '../tools/pharos-footer/pharos-footer.component';
import {HelpPanelTriggerComponent} from '../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {ScrollspyDirective} from '../tools/sidenav-panel/directives/scrollspy.directive';
import {HelpArticlesModule} from './help-articles.module';
import {LinkVisualComponent} from '../tools/visualizations/force-directed-graph/components/shared/link-visual/link-visual.component';
import {HoverableNodeDirective} from '../tools/visualizations/force-directed-graph/directives/hoverable-node.directive';
import {HoverableLinkDirective} from '../tools/visualizations/force-directed-graph/directives/hoverable-link.directive';
import {DraggableDirective} from '../tools/visualizations/force-directed-graph/directives/draggable.directive';
import {ClickableNodeDirective} from '../tools/visualizations/force-directed-graph/directives/clickable-node.directive';
import {ClickableLinkDirective} from '../tools/visualizations/force-directed-graph/directives/clickable-link.directive';
import {NodeVisualComponent} from '../tools/visualizations/force-directed-graph/components/shared/node-visual/node-visual.component';
import {ZoomableDirective} from '../tools/visualizations/force-directed-graph/directives/zoomable.directive';
import {ScatterPlotComponent} from '../tools/visualizations/scatter-plot/scatter-plot.component';
import {LineChartComponent} from '../tools/visualizations/line-chart/line-chart.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HelpArticlesModule
  ],
  declarations: [
    NcatsHeaderComponent,
    PharosFooterComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    TermDisplayComponent,
    LineChartComponent,
    BarChartComponent,
    ToiCardComponent,
    HelpPanelTriggerComponent,
    ScrollspyDirective,
    ScatterPlotComponent,

    LinkVisualComponent,
    NodeVisualComponent,
    ClickableLinkDirective,
    ClickableNodeDirective,
    DraggableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    ZoomableDirective


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
    NcatsHeaderComponent,
    PharosFooterComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    TermDisplayComponent,
    LineChartComponent,
    BarChartComponent,
    ToiCardComponent,
    HelpPanelTriggerComponent,
    ScrollspyDirective,
    ScatterPlotComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ComponentInjectorService
      ]
    };
  }
}
