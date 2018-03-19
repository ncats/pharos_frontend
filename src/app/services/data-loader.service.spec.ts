import { TestBed, inject } from '@angular/core/testing';

import { DataLoaderService } from './data-loader.service';
import {HttpClientModule} from "@angular/common/http";

describe('DataLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
      providers: [DataLoaderService]
    });
  });

  it('should be created', inject([DataLoaderService], (service: DataLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
