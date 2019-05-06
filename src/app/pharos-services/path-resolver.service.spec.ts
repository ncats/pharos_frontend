import { TestBed, inject } from '@angular/core/testing';

import { PathResolverService } from './path-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {FacetRetrieverService} from '../pharos-main/data-list/filter-panel/facet-retriever.service';
import {PharosApiService} from './pharos-api.service';
import {ResponseParserService} from './response-parser.service';

describe('PathResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
       PathResolverService
      ]
    });
  });

  it('should be created', inject([PathResolverService], (service: PathResolverService) => {
    expect(service).toBeTruthy();
  }));
});
