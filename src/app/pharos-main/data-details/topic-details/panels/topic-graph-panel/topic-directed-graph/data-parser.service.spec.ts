import { TestBed } from '@angular/core/testing';

import { DataParserService } from './data-parser.service';

describe('DataParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataParserService = TestBed.get(DataParserService);
    expect(service).toBeTruthy();
  });
});
