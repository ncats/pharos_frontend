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
  DISEASE_DETAILS_COMPONENT,
  DISEASE_SOURCE_PANEL,
  DISEASE_TABLE_COMPONENT, EXPRESSION_PANEL, KNOWLEDGE_PANEL, ORTHOLOG_PANEL, REFERENCES_PANEL,
  SUMMARY_PANEL,
  TARGET_DETAILS_COMPONENT, TARGET_FACET_PANEL,
  TARGET_TABLE_COMPONENT, TOPIC_DETAILS_COMPONENT, TOPIC_TABLE_COMPONENT
} from '../../environments/environment.prod';
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
import {RadarChartComponent} from "../tools/radar-chart/radar-chart.component";

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
    // topics
    { provide: TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
    { provide: TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
    // targets
    { provide: TARGET_TABLE_COMPONENT, useValue: TargetTableComponent },
    { provide: TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent },
    { provide: SUMMARY_PANEL, useValue: SummaryPanelComponent },
    { provide: KNOWLEDGE_PANEL, useValue: KnowledgePanelComponent },
    { provide: REFERENCES_PANEL, useValue: ReferencesPanelComponent },
    { provide: DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent },
    { provide: EXPRESSION_PANEL, useValue: ExpressionPanelComponent },
    { provide: ORTHOLOG_PANEL, useValue: OrthologPanelComponent },
    { provide: TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent },
    // diseases
    { provide: DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent },
    { provide: DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent },
  ],
  entryComponents: [
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

