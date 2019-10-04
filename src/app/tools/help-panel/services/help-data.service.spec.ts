import { TestBed, inject } from '@angular/core/testing';

import { HelpDataService } from './help-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HelpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpDataService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([HelpDataService], (service: HelpDataService) => {
    expect(service).toBeTruthy();
  }));
});
