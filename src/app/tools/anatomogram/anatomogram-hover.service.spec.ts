import { TestBed } from '@angular/core/testing';

import { AnatomogramHoverService } from './anatomogram-hover.service';

describe('AnatomogramHoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AnatomogramHoverService
    ]
  }));

  it('should be created', () => {
    const service: AnatomogramHoverService = TestBed.inject(AnatomogramHoverService);
    expect(service).toBeTruthy();
  });
});
