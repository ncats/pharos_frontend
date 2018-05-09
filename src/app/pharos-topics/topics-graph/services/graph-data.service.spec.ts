import { TestBed, inject } from '@angular/core/testing';

import { GraphDataService } from './graph-data.service';

describe('GraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphDataService]
    });
  });

  it('should be created', inject([GraphDataService], (service: GraphDataService) => {
    expect(service).toBeTruthy();
  }));
});
