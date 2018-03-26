import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentVariablesService } from './environment-variables.service';

describe('EnvironmentVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentVariablesService]
    });
  });

  it('should be created', inject([EnvironmentVariablesService], (service: EnvironmentVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
