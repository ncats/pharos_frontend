import { TestBed, inject } from '@angular/core/testing';

import { StructureSetterService } from './structure-setter.service';

describe('StructureSetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructureSetterService]
    });
  });

  it('should be created', inject([StructureSetterService], (service: StructureSetterService) => {
    expect(service).toBeTruthy();
  }));
});
