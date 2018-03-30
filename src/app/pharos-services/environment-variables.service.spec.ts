import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentVariablesService } from './environment-variables.service';
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../shared/shared.module";
import {FacetRetrieverService} from "../pharos-main/services/facet-retriever.service";
import {PharosApiService} from "./pharos-api.service";
import {ResponseParserService} from "./response-parser.service";

describe('EnvironmentVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        EnvironmentVariablesService
      ]
    });
  });

  it('should be created', inject([EnvironmentVariablesService], (service: EnvironmentVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
