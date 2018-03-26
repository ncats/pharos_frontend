import { TestBed, inject } from '@angular/core/testing';

import { PharosApiService } from './pharos-api.service';

describe('PharosApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharosApiService]
    });
  });

  it('should be created', inject([PharosApiService], (service: PharosApiService) => {
    expect(service).toBeTruthy();
  }));
});
