import { NgModule } from '@angular/core';
import {TopicHeaderComponent} from './topic-details/topic-header/topic-header.component';
import {TopicDetailsComponent} from './topic-details/topic-details.component';
import {TopicTableComponent} from './topic-table/topic-table.component';
import {TOPIC_DETAILS_COMPONENT, TOPIC_TABLE_COMPONENT} from '../../environments/environment.prod';
import {SharedModule} from '../shared/shared.module';
import {DataListResolver} from '../pharos-main/services/data-list.resolver';
import {DataDetailsResolver} from '../pharos-main/services/data-details.resolver';
import {SharedListModule} from '../shared/shared-list.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {ClickableLinkDirective} from './topics-graph/directives/clickable-link.directive';
import {ClickableNodeDirective} from './topics-graph/directives/clickable-node.directive';
import {DraggableDirective} from './topics-graph/directives/draggable.directive';
import {HoverableNodeDirective} from './topics-graph/directives/hoverable-node.directive';
import {HoverableLinkDirective} from './topics-graph/directives/hoverable-link.directive';
import {ZoomableDirective} from './topics-graph/directives/zoomable.directive';
import {NodeVisualComponent} from './topics-graph/components/shared/node-visual/node-visual.component';
import {NodeMenuComponent} from './topics-graph/components/shared/node-menu/node-menu.component';
import {LinkVisualComponent} from './topics-graph/components/shared/link-visual/link-visual.component';
import {GraphComponent} from './topics-graph/components/graph/graph.component';
import {NodeExpandService} from './topics-graph/services/event-tracking/node-expand.service';
import {SettingsService} from './topics-graph/services/settings.service';
import {LoadingService} from '../pharos-services/loading.service';
import {NodeMenuControllerService} from './topics-graph/services/event-tracking/node-menu-controller.service';
import {GraphDataService} from './topics-graph/services/graph-data.service';
import {MessageService} from './topics-graph/services/message.service';
import {LinkService} from './topics-graph/services/event-tracking/link.service';
import {NodeService} from './topics-graph/services/event-tracking/node.service';
import {D3Service} from './topics-graph/services/event-tracking/d3.service';
import {DataConnectionService} from './topics-graph/services/connection/data-connection.service';
import {WebSocketService} from './topics-graph/services/connection/websocket.service';
import {DataListComponent} from '../pharos-main/data-list/data-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentLookupService} from '../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {DataDetailsComponent} from '../pharos-main/data-details/data-details.component';
import {PharosMainComponent} from "../pharos-main/pharos-main.component";

const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
   // runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }, {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];

// todo: shared providers in modules here: https://blog.angular-university.io/angular2-ngmodule/

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
  ],
  entryComponents: [
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    GraphComponent
  ],
  declarations: [
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
    NodeMenuComponent,
    GraphComponent

  ]
})
export class PharosTopicsRoutingModule { }
