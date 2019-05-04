import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import {SharedDetailsModule} from '../../shared/shared-details.module';
import {TopicHeaderComponent} from './components/topic-header/topic-header.component';
import {GraphComponent} from './components/topics-graph/components/graph/graph.component';
import {NodeDisplayComponent} from './panels/node-display/node-display.component';
import {DataConnectionService} from './components/topics-graph/services/connection/data-connection.service';
import {WebSocketService} from './components/topics-graph/services/connection/websocket.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {TestComponentLookupService} from '../../../../test/test-component-lookup.service';
import {DataDetailsResolver} from '../../pharos-main/services/data-details.resolver';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {APP_BASE_HREF} from '@angular/common';
import {GraphDataService} from './components/topics-graph/services/graph-data.service';
import {MessageService} from './components/topics-graph/services/message.service';
import {NodeService} from './components/topics-graph/services/event-tracking/node.service';
import {LinkService} from './components/topics-graph/services/event-tracking/link.service';
import {D3Service} from './components/topics-graph/services/event-tracking/d3.service';

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TopicDetailsComponent,
        TopicHeaderComponent,
        GraphComponent,
        NodeDisplayComponent
      ],
      providers: [
        GraphDataService,
        DataConnectionService,
        WebSocketService,
        LoadingService,
        MessageService,
        NodeService,
        LinkService,
        D3Service,
        PharosApiService,
        DataDetailsResolver,
        PathResolverService,
        ResponseParserService,
        ComponentInjectorService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
