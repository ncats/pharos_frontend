import { TestBed, inject } from '@angular/core/testing';

import { MolConverterService } from './mol-converter.service';

describe('MolConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MolConverterService]
    });
  });

  it('should be created', inject([MolConverterService], (service: MolConverterService) => {
    expect(service).toBeTruthy();
  }));
});
