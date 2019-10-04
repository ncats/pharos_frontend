import { TestBed, inject } from '@angular/core/testing';

import { SuggestApiService } from './suggest-api.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SuggestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        SuggestApiService
      ]
    });
  });

  it('should be created', inject([SuggestApiService], (service: SuggestApiService) => {
    expect(service).toBeTruthy();
  }));
});
