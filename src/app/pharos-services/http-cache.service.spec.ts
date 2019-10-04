import { TestBed } from '@angular/core/testing';

import { HttpCacheService } from './http-cache.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('HttpCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useClass: HttpClientTestingModule}
    ]
  }));

  it('should be created', () => {
    const service: HttpCacheService = TestBed.get(HttpCacheService);
    expect(service).toBeTruthy();
  });
});
