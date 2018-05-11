import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import {SharedModule} from "../../../../../../shared/shared.module";
import {D3Service} from "../../services/event-tracking/d3.service";
import {LoadingService} from "../../../../../../pharos-services/loading.service";
import {GraphDataService} from "../../services/graph-data.service";
import {NodeService} from "../../services/event-tracking/node.service";
import {LinkService} from "../../services/event-tracking/link.service";
import {DataConnectionService} from "../../services/connection/data-connection.service";
import {WebSocketService} from "../../services/connection/websocket.service";
import {MessageService} from "../../services/message.service";

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ GraphComponent ],
      providers: [
        D3Service,
        LoadingService,
        GraphDataService,
        NodeService,
        LinkService,
        DataConnectionService,
        WebSocketService,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
