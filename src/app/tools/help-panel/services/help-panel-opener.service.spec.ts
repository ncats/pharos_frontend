import { TestBed, inject } from '@angular/core/testing';

import { HelpPanelOpenerService } from './help-panel-opener.service';

describe('HelpPanelOpenerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpPanelOpenerService]
    });
  });

  it('should be created', inject([HelpPanelOpenerService], (service: HelpPanelOpenerService) => {
    expect(service).toBeTruthy();
  }));
});
