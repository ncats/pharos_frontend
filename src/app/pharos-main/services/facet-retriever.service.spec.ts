import { TestBed, inject } from '@angular/core/testing';

import { FacetRetrieverService } from './facet-retriever.service';

describe('FacetRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacetRetrieverService]
    });
  });

  it('should be created', inject([FacetRetrieverService], (service: FacetRetrieverService) => {
    expect(service).toBeTruthy();
  }));
});
