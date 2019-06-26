import { TestBed } from '@angular/core/testing';

import { PharosProfileService } from './pharos-profile.service';

describe('PharosProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharosProfileService = TestBed.get(PharosProfileService);
    expect(service).toBeTruthy();
  });
});
