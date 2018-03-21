import { TestBed, inject } from '@angular/core/testing';

import { ResponseParserService } from './response-parser.service';

describe('ResponseParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseParserService]
    });
  });

  it('should be created', inject([ResponseParserService], (service: ResponseParserService) => {
    expect(service).toBeTruthy();
  }));
});
