import { TestBed, inject } from '@angular/core/testing';

import { NodeExpandService } from './node-expand.service';

describe('NodeExpandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeExpandService]
    });
  });

  it('should be created', inject([NodeExpandService], (service: NodeExpandService) => {
    expect(service).toBeTruthy();
  }));
});
