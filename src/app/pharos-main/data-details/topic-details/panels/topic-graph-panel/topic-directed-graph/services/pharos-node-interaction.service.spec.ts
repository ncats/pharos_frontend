import { TestBed } from '@angular/core/testing';

import { NodeInteractionService } from './pharos-node-interaction.service';

describe('NodeInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeInteractionService = TestBed.get(NodeInteractionService);
    expect(service).toBeTruthy();
  });
});
