import { NgModule } from '@angular/core';
import {TopicHeaderComponent} from './topic-details/components/topic-header/topic-header.component';
import {TopicDetailsComponent} from './topic-details/topic-details.component';
import {TopicTableComponent} from './topic-table/topic-table.component';
import {SharedModule} from '../shared/shared.module';
import {DataListResolver} from '../pharos-main/services/data-list.resolver';
import {DataDetailsResolver} from '../pharos-main/services/data-details.resolver';
import {SharedListModule} from '../shared/shared-list.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {DataListComponent} from '../pharos-main/data-list/data-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentLookupService} from '../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {DataDetailsComponent} from '../pharos-main/data-details/data-details.component';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {WebSocketService} from './topic-details/components/topics-graph/services/connection/websocket.service';
import {DataConnectionService} from './topic-details/components/topics-graph/services/connection/data-connection.service';
import {D3Service} from './topic-details/components/topics-graph/services/event-tracking/d3.service';
import {NodeService} from './topic-details/components/topics-graph/services/event-tracking/node.service';
import {LinkService} from './topic-details/components/topics-graph/services/event-tracking/link.service';
import {MessageService} from './topic-details/components/topics-graph/services/message.service';
import {GraphDataService} from './topic-details/components/topics-graph/services/graph-data.service';
import {NodeMenuControllerService} from './topic-details/components/topics-graph/services/event-tracking/node-menu-controller.service';
import {LoadingService} from '../pharos-services/loading.service';
import {SettingsService} from './topic-details/components/topics-graph/services/settings.service';
import {NodeExpandService} from './topic-details/components/topics-graph/services/event-tracking/node-expand.service';
import {GraphComponent} from './topic-details/components/topics-graph/components/graph/graph.component';
import {NodeVisualComponent} from './topic-details/components/topics-graph/components/shared/node-visual/node-visual.component';
import {LinkVisualComponent} from './topic-details/components/topics-graph/components/shared/link-visual/link-visual.component';
import {ZoomableDirective} from './topic-details/components/topics-graph/directives/zoomable.directive';
import {HoverableLinkDirective} from './topic-details/components/topics-graph/directives/hoverable-link.directive';
import {HoverableNodeDirective} from './topic-details/components/topics-graph/directives/hoverable-node.directive';
import {DraggableDirective} from './topic-details/components/topics-graph/directives/draggable.directive';
import {ClickableNodeDirective} from './topic-details/components/topics-graph/directives/clickable-node.directive';
import {ClickableLinkDirective} from './topic-details/components/topics-graph/directives/clickable-link.directive';
import {NodeMenuComponent} from './topic-details/components/topics-graph/components/shared/node-menu/node-menu.component';

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

// todo: the redirect when changing from targets to topics loads the new module
// todo: at the same time, the current view is reacting to the change in data and loading the topic table component, but not the module
// todo: solution: ????? 1. merge topic table back into main module 2. aggressively destroy view on data change 3. ???
// todo:


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
  //  { provide: TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
  //  { provide: TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
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
