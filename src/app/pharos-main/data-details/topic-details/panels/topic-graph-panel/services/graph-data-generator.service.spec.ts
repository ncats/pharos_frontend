import { TestBed } from '@angular/core/testing';

import { GraphDataGeneratorService } from './graph-data-generator.service';

describe('GraphDataGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphDataGeneratorService = TestBed.get(GraphDataGeneratorService);
    expect(service).toBeTruthy();
  });
});
