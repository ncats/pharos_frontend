import { TestBed } from '@angular/core/testing';

import { PharosAuthService } from './pharos-auth.service';

describe('PharosAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharosAuthService = TestBed.get(PharosAuthService);
    expect(service).toBeTruthy();
  });
});
