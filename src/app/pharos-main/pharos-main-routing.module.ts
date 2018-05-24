///<reference path="../pharos-topics/topic-details/components/topic-header/topic-header.component.ts"/>
import { NgModule} from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from './data-list/target-table/target-table.component';
import {DataDetailsComponent} from './data-details/data-details.component';
import {DataDetailsResolver} from './services/data-details.resolver';
import {TargetDetailsComponent} from './data-details/target-details/target-details.component';
import {SummaryPanelComponent} from './data-details/target-details/panels/summary-panel/summary-panel.component';
import {TargetHeaderComponent} from './data-details/target-details/target-header/target-header.component';
import {SharedModule} from '../shared/shared.module';
import { DiseaseTableComponent} from './data-list/disease-table/disease-table.component';

import {
  ReferencesPanelComponent
} from './data-details/target-details/panels/references-panel/references-panel.component';
import {KnowledgePanelComponent} from './data-details/target-details/panels/knowledge-panel/knowledge-panel.component';
import {ExpressionPanelComponent} from './data-details/target-details/panels/expression-panel/expression-panel.component';
import {DiseaseSourceComponent} from './data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {OrthologPanelComponent} from './data-details/target-details/panels/ortholog-panel/ortholog-panel.component';
import {TargetFacetPanelComponent} from './data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {
  ClassificationExplanationComponent
} from './data-details/target-details/panels/classification-explanation/classification-explanation.component';
import {DiseaseDetailsComponent} from './data-details/disease-details/disease-details.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedListModule} from '../shared/shared-list.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {WebSocketService} from '../pharos-topics/topic-details/components/topics-graph/services/connection/websocket.service';
import {DataConnectionService} from '../pharos-topics/topic-details/components/topics-graph/services/connection/data-connection.service';
import {D3Service} from '../pharos-topics/topic-details/components/topics-graph/services/event-tracking/d3.service';
import {NodeService} from '../pharos-topics/topic-details/components/topics-graph/services/event-tracking/node.service';
import {LinkService} from '../pharos-topics/topic-details/components/topics-graph/services/event-tracking/link.service';
import {MessageService} from '../pharos-topics/topic-details/components/topics-graph/services/message.service';
import {GraphDataService} from '../pharos-topics/topic-details/components/topics-graph/services/graph-data.service';
import {
  NodeMenuControllerService
} from '../pharos-topics/topic-details/components/topics-graph/services/event-tracking/node-menu-controller.service';
import {LoadingService} from '../pharos-services/loading.service';
import {SettingsService} from '../pharos-topics/topic-details/components/topics-graph/services/settings.service';
import {NodeExpandService} from '../pharos-topics/topic-details/components/topics-graph/services/event-tracking/node-expand.service';
import {TopicTableComponent} from '../pharos-topics/topic-table/topic-table.component';
import {TopicDetailsComponent} from '../pharos-topics/topic-details/topic-details.component';
import {TopicHeaderComponent} from '../pharos-topics/topic-details/components/topic-header/topic-header.component';
import {GraphComponent} from '../pharos-topics/topic-details/components/topics-graph/components/graph/graph.component';
import {
  NodeVisualComponent
} from '../pharos-topics/topic-details/components/topics-graph/components/shared/node-visual/node-visual.component';
import {
  LinkVisualComponent
} from '../pharos-topics/topic-details/components/topics-graph/components/shared/link-visual/link-visual.component';
import {ZoomableDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/zoomable.directive';
import {HoverableLinkDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/hoverable-link.directive';
import {HoverableNodeDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/hoverable-node.directive';
import {DraggableDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/draggable.directive';
import {ClickableNodeDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/clickable-node.directive';
import {ClickableLinkDirective} from '../pharos-topics/topic-details/components/topics-graph/directives/clickable-link.directive';
import {NodeMenuComponent} from '../pharos-topics/topic-details/components/topics-graph/components/shared/node-menu/node-menu.component';
import {NodeDisplayComponent} from '../pharos-topics/topic-details/components/node-display/node-display.component';
import {RadarChartComponent} from '../tools/radar-chart/radar-chart.component';
import {TOKENS} from '../../environments/component-tokens';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';

const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }, {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    SharedListModule,
    SharedDetailsModule,
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    WebSocketService,
    DataConnectionService,
    D3Service,
    NodeService,
    LinkService,
    MessageService,
    GraphDataService,
    NodeMenuControllerService,
    LoadingService,
    SettingsService,
    NodeExpandService,
    // breadcrumb
    {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent },
    // topics
    {provide: TOKENS.TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
    // targets
    {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent },
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent },
    {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent },
    {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent },
    {provide: TOKENS.KNOWLEDGE_PANEL, useValue: KnowledgePanelComponent },
    {provide: TOKENS.REFERENCES_PANEL, useValue: ReferencesPanelComponent },
    {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent },
    {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent },
    {provide: TOKENS.ORTHOLOG_PANEL, useValue: OrthologPanelComponent },
    {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent },
    // diseases
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent },
    {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent },
  ],
  entryComponents: [
    BreadcrumbComponent,
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseSourceComponent,
    KnowledgePanelComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    ClassificationExplanationComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    GraphComponent,
    RadarChartComponent
  ],
  declarations: [
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    KnowledgePanelComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    DiseaseSourceComponent,
    ClassificationExplanationComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    DraggableDirective,
    ClickableNodeDirective,
    ClickableLinkDirective,
    NodeDisplayComponent,
    NodeMenuComponent,
    GraphComponent,
    RadarChartComponent
  ]
})
export class PharosMainRoutingModule { }

