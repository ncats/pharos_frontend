import {inject, TestBed} from '@angular/core/testing';

import {PharosApiService} from './pharos-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';

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
