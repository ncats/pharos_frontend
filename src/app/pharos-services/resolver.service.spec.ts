import { TestBed } from '@angular/core/testing';

import { ResolverService } from './resolver.service';
import {SharedModule} from '../shared/shared.module';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

describe('ResolverService', () => {
  let service: ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ]});
    service = TestBed.inject(ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
