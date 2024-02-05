import { TestBed } from '@angular/core/testing';

import { DynamicServicesService } from './dynamic-services.service';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';

describe('DynamicServicesService', () => {
  let service: DynamicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
        ]
    });
    service = TestBed.inject(DynamicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
