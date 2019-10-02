import { TestBed, inject } from '@angular/core/testing';

import { StructureSetterService } from './structure-setter.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('StructureSetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: HttpClientTestingModule },
        StructureSetterService
      ]
    });
  });

  it('should be created', inject([StructureSetterService], (service: StructureSetterService) => {
    expect(service).toBeTruthy();
  }));
});
