import { TestBed } from '@angular/core/testing';

import { ResolverService } from './resolver.service';
import {SharedModule} from '../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
