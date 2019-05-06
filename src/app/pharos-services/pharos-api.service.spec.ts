import { TestBed, inject } from '@angular/core/testing';

import { PharosApiService } from './pharos-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {FacetRetrieverService} from '../pharos-main/data-list/filter-panel/facet-retriever.service';
import {ResponseParserService} from './response-parser.service';

describe('PharosApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        PharosApiService
      ]
    });
  });

  it('should be created', inject([PharosApiService], (service: PharosApiService) => {
    expect(service).toBeTruthy();
  }));
});
