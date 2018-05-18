import { TestBed, inject } from '@angular/core/testing';

import { RadarService } from './radar.service';

describe('RadarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadarService]
    });
  });

  it('should be created', inject([RadarService], (service: RadarService) => {
    expect(service).toBeTruthy();
  }));
});
