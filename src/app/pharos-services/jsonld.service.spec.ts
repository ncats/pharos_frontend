import { TestBed } from '@angular/core/testing';

import { JsonldService } from './jsonld.service';

describe('JsonldService', () => {
  let service: JsonldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
