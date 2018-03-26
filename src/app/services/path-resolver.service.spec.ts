import { TestBed, inject } from '@angular/core/testing';

import { PathResolverService } from './path-resolver.service';

describe('PathResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathResolverService]
    });
  });

  it('should be created', inject([PathResolverService], (service: PathResolverService) => {
    expect(service).toBeTruthy();
  }));
});
