import { TestBed, inject } from '@angular/core/testing';

import { ResponseParserService } from './response-parser.service';
import {RouterTestingModule} from '@angular/router/testing';
import {EnvironmentVariablesService} from './environment-variables.service';
import {SharedModule} from '../shared/shared.module';
import {FacetRetrieverService} from '../pharos-main/services/facet-retriever.service';
import {PharosApiService} from './pharos-api.service';

describe('ResponseParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        EnvironmentVariablesService,
        PharosApiService,
        ResponseParserService
      ]
    });
  });

  it('should be created', inject([ResponseParserService], (service: ResponseParserService) => {
    expect(service).toBeTruthy();
  }));
});
