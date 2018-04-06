import { TestBed, inject } from '@angular/core/testing';

import { ComponentInjectorService } from './component-injector.service';

describe('ComponentInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentInjectorService]
    });
  });

  it('should be created', inject([ComponentInjectorService], (service: ComponentInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
