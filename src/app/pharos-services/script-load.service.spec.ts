import { TestBed } from '@angular/core/testing';

import { ScriptLoadService } from './script-load.service';

describe('ScriptLoadService', () => {
  let service: ScriptLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
