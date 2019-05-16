import {inject, TestBed} from '@angular/core/testing';

import {PathResolverService} from './path-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';

describe('PathResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
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
