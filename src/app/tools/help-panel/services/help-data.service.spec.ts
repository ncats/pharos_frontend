import { TestBed, inject } from '@angular/core/testing';

import { HelpDataService } from './help-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('HelpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpDataService
      ],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([HelpDataService], (service: HelpDataService) => {
    expect(service).toBeTruthy();
  }));
});
