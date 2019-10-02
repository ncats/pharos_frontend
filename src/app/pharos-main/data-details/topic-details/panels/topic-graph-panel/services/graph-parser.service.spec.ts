import { TestBed } from '@angular/core/testing';

import { GraphParserService } from './graph-parser.service';
import {LinkService, NodeService} from 'smrtgraph-core';

describe('GraphParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NodeService,
      LinkService
    ]
  }));

  it('should be created', () => {
    const service: GraphParserService = TestBed.get(GraphParserService);
    expect(service).toBeTruthy();
  });
});
