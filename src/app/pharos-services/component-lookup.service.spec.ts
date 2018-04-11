import { TestBed, inject } from '@angular/core/testing';

import { ComponentLookupService } from './component-lookup.service';

describe('ComponentLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentLookupService]
    });
  });

  it('should be created', inject([ComponentLookupService], (service: ComponentLookupService) => {
    expect(service).toBeTruthy();
  }));
});
