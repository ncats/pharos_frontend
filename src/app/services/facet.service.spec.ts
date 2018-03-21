import { TestBed, inject } from '@angular/core/testing';

import { FacetService } from './facet.service';

describe('FacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacetService]
    });
  });

  it('should be created', inject([FacetService], (service: FacetService) => {
    expect(service).toBeTruthy();
  }));
});
