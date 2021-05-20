import { TestBed } from '@angular/core/testing';

import { MolChangeService } from './mol-change.service';

describe('MolChangeService', () => {
  let service: MolChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MolChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
