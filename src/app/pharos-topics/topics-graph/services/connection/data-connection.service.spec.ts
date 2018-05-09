import { TestBed, inject } from '@angular/core/testing';

import { DataConnectionService } from './data-connection.service';

describe('DataConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataConnectionService]
    });
  });

  it('should ...', inject([DataConnectionService], (service: DataConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
