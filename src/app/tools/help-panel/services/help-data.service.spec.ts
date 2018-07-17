import { TestBed, inject } from '@angular/core/testing';

import { HelpDataService } from './help-data.service';

describe('HelpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpDataService]
    });
  });

  it('should be created', inject([HelpDataService], (service: HelpDataService) => {
    expect(service).toBeTruthy();
  }));
});
