import { TestBed } from '@angular/core/testing';

import { PharosAuthService } from './pharos-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../../test/firestore-stub';
import {SharedModule} from '../shared/shared.module';

describe('PharosAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: PharosAuthService = TestBed.get(PharosAuthService);
    expect(service).toBeTruthy();
  });
});
