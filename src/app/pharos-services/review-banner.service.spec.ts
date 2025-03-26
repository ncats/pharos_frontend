import { TestBed } from '@angular/core/testing';

import { ReviewBannerService } from './review-banner.service';

describe('ReviewBannerServiceService', () => {
  let service: ReviewBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
