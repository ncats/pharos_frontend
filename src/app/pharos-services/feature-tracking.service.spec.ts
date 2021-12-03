import { TestBed } from '@angular/core/testing';

import { FeatureTrackingService } from './feature-tracking.service';

describe('FeatureTrackingService', () => {
  let service: FeatureTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
