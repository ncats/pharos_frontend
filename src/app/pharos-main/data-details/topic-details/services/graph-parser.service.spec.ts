import { TestBed } from '@angular/core/testing';

import { GraphParserService } from './graph-parser.service';

describe('GraphParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphParserService = TestBed.get(GraphParserService);
    expect(service).toBeTruthy();
  });
});
