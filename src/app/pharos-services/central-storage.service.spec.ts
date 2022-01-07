import { TestBed } from '@angular/core/testing';

import { CentralStorageService } from './central-storage.service';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';

describe('CentralStorageService', () => {
  let service: CentralStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]});
    service = TestBed.inject(CentralStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
