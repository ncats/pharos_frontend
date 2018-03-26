import { TestBed, inject } from '@angular/core/testing';

import { UnfurlingMetaService } from './unfurling-meta.service';

describe('UnfurlingMetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnfurlingMetaService]
    });
  });

  it('should be created', inject([UnfurlingMetaService], (service: UnfurlingMetaService) => {
    expect(service).toBeTruthy();
  }));
});
