import { TestBed } from '@angular/core/testing';

import { LigandNodeMappingService } from './ligand-node-mapping.service';

describe('LigandNodeMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LigandNodeMappingService = TestBed.get(LigandNodeMappingService);
    expect(service).toBeTruthy();
  });
});
