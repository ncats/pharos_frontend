import {inject, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {PathResolverService} from './path-resolver.service';

describe('PathResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
       PathResolverService
      ]
    });
  });

  it('should be created', inject([PathResolverService], (service: PathResolverService) => {
    expect(service).toBeTruthy();
  }));
});
