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
import {IdgLevelIndicatorComponent} from '../tools/idg-level-indicator/idg-level-indicator.component';
import {CustomContentDirective} from '../tools/custom-content.directive';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {ComponentLookupService} from '../pharos-services/component-lookup.service';
import {GenericTableComponent} from '../tools/generic-table/generic-table.component';
import {TermDisplayComponent} from '../tools/term-display/term-display.component';
import {LineChartComponent} from '../tools/visualizations/line-chart/line-chart.component';
import {LinkListComponent} from '../tools/link-list/link-list.component';
import {ToiCardComponent} from '../pharos-dashboard/toi-card/toi-card.component';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';
import {NcatsHeaderComponent} from '../tools/ncats-header/ncats-header.component';
import {PharosTabsComponent} from '../tools/pharos-tabs/pharos-tabs.component';
import {BarChartComponent} from '../tools/visualizations/bar-chart/bar-chart.component';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {PharosFooterComponent} from '../tools/pharos-footer/pharos-footer.component';
import {HelpPanelTriggerComponent} from '../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {HelpDataService} from '../tools/help-panel/services/help-data.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {PropertyDisplayComponent} from '../tools/property-display/property-display.component';
import {KnowledgeTableComponent} from '../tools/knowledge-table/knowledge-table.component';
import {ProteinStructureViewerComponent} from "../tools/protein-structure-viewer/protein-structure-viewer.component";
import {HelpArticlesModule} from "../shared/help-articles.module";
import {EquationRendererComponent} from "../tools/equation-renderer/equation-renderer.component";
import {ScrollspyDirective} from "../tools/sidenav-panel/directives/scrollspy.directive";
import {StickynavDirective} from "../tools/sidenav-panel/directives/stickynav.directive";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    NgxJsonViewerModule,
    HelpArticlesModule
  ],
  declarations: [
    NcatsHeaderComponent,
    PharosFooterComponent,
    BreadcrumbComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent,
    PropertyDisplayComponent,
    LineChartComponent,
    BarChartComponent,
    LinkListComponent,
    ToiCardComponent,
    PharosTabsComponent,
    HelpPanelComponent,
    HelpPanelTriggerComponent,
    KnowledgeTableComponent,
    ProteinStructureViewerComponent,
    ScrollspyDirective,
    StickynavDirective
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
    BreadcrumbComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent,
    PropertyDisplayComponent,
    LineChartComponent,
    BarChartComponent,
    LinkListComponent,
    ToiCardComponent,
    PharosTabsComponent,
    HelpPanelComponent,
    HelpPanelTriggerComponent,
    KnowledgeTableComponent,
    ProteinStructureViewerComponent,
    ScrollspyDirective,
    StickynavDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ComponentLookupService,
        ComponentInjectorService
      ]
    };
  }
}
