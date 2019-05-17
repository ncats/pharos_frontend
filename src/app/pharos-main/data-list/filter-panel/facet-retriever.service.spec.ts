import {inject, TestBed} from '@angular/core/testing';

import {FacetRetrieverService} from './facet-retriever.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('FacetRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        PharosApiService,
        FacetRetrieverService
      ]
    });
  });

  it('should be created', inject([FacetRetrieverService], (service: FacetRetrieverService) => {
    expect(service).toBeTruthy();
  }));
});
