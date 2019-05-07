import { TestBed, inject } from '@angular/core/testing';

import { GraphDataService } from './graph-data.service';
import {NodeService} from '../../../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service';
import {LinkService} from './event-tracking/link.service';

describe('GraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
