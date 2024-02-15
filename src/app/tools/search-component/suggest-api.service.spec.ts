import { TestBed, inject } from '@angular/core/testing';

import { SuggestApiService } from './suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Apollo} from "apollo-angular";

describe('SuggestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SuggestApiService,
        Apollo
      ]
    });
  });

  it('should be created', inject([SuggestApiService], (service: SuggestApiService) => {
    expect(service).toBeTruthy();
  }));
});
