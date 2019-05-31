import { TestBed, inject } from '@angular/core/testing';
import {PharosNodeService} from "./pharos-node.service";


describe('PharosNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharosNodeService]
    });
  });

  it('should be created', inject([PharosNodeService], (service: PharosNodeService) => {
    expect(service).toBeTruthy();
  }));
});
