import { TestBed, inject } from '@angular/core/testing';

import { SuggestApiService } from './suggest-api.service';
import {SharedModule} from "../../shared/shared.module";
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('SuggestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        EnvironmentVariablesService,
        SuggestApiService
      ]
    });
  });

  it('should be created', inject([SuggestApiService], (service: SuggestApiService) => {
    expect(service).toBeTruthy();
  }));
});
