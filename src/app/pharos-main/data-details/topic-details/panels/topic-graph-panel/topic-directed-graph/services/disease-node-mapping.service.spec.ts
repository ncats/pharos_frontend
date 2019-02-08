import { TestBed } from '@angular/core/testing';

import { DiseaseNodeMappingService } from './disease-node-mapping.service';

describe('DiseaseNodeMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiseaseNodeMappingService = TestBed.get(DiseaseNodeMappingService);
    expect(service).toBeTruthy();
  });
});
