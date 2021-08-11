import { TestBed } from '@angular/core/testing';

import { PdbOptionsService } from './pdb-options.service';

describe('PdbOptionsService', () => {
  let service: PdbOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdbOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
