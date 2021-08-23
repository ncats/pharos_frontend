import { TestBed } from '@angular/core/testing';

import { CentralStorageService } from './central-storage.service';

describe('CentralStorageService', () => {
  let service: CentralStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
