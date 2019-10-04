import { TestBed } from '@angular/core/testing';

import { AnatamogramHoverService } from './anatamogram-hover.service';

describe('AnatamogramHoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AnatamogramHoverService
    ]
  }));

  it('should be created', () => {
    const service: AnatamogramHoverService = TestBed.get(AnatamogramHoverService);
    expect(service).toBeTruthy();
  });
});
