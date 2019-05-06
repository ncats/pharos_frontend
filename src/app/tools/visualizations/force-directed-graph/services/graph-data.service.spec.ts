import {inject, TestBed} from '@angular/core/testing';
import {GraphDataService} from './graph-data.service';
import {DataConnectionService} from './connection/data-connection.service';
import {MessageService} from './message.service';
import {NodeService} from './event-tracking/node.service';
import {LinkService} from './event-tracking/link.service';

describe('GraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataConnectionService,
        MessageService,
        NodeService,
        LinkService,
        GraphDataService
      ]
    });
  });

  it('should be created', inject([GraphDataService], (service: GraphDataService) => {
    expect(service).toBeTruthy();
  }));
});
