import { TestBed, inject } from '@angular/core/testing';

import { KatexRenderService } from './katex-render.service';

describe('KatexRenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KatexRenderService]
    });
  });

  it('should be created', inject([KatexRenderService], (service: KatexRenderService) => {
    expect(service).toBeTruthy();
  }));
});
