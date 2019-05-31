import { TestBed } from '@angular/core/testing';

import { PharosNodeInteractionService } from './pharos-node-interaction.service';

describe('PharosNodeInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharosNodeInteractionService = TestBed.get(PharosNodeInteractionService);
    expect(service).toBeTruthy();
  });
});
