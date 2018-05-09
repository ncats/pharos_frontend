import { TestBed, inject } from '@angular/core/testing';

import { NodeMenuControllerService } from './node-menu-controller.service';

describe('NodeMenuControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeMenuControllerService]
    });
  });

  it('should be created', inject([NodeMenuControllerService], (service: NodeMenuControllerService) => {
    expect(service).toBeTruthy();
  }));
});
