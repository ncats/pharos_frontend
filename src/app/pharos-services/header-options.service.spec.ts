import { TestBed } from '@angular/core/testing';

import { HeaderOptionsService } from './header-options.service';

describe('HeaderOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderOptionsService = TestBed.get(HeaderOptionsService);
    expect(service).toBeTruthy();
  });
});
