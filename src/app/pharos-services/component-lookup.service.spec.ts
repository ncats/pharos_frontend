import { TestBed, inject } from '@angular/core/testing';

import { ComponentLookupService } from './component-lookup.service';
import {EnvironmentVariablesService} from './environment-variables.service';

describe('ComponentLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentVariablesService,
        ComponentLookupService]

    });
  });

  it('should be created', inject([ComponentLookupService], (service: ComponentLookupService) => {
    expect(service).toBeTruthy();
  }));
});
