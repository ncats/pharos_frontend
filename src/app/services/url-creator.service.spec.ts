import { TestBed, inject } from '@angular/core/testing';

import { UrlCreatorService } from './url-creator.service';

describe('UrlCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlCreatorService]
    });
  });

  it('should be created', inject([UrlCreatorService], (service: UrlCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
