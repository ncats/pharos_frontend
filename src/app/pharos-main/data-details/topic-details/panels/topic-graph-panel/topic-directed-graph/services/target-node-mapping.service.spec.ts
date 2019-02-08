import { TestBed } from '@angular/core/testing';

import { TargetNodeMappingService } from './target-node-mapping.service';

describe('TargetNodeMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TargetNodeMappingService = TestBed.get(TargetNodeMappingService);
    expect(service).toBeTruthy();
  });
});
