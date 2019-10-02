import { TestBed } from '@angular/core/testing';

import { PharosProfileService } from './pharos-profile.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../../test/firestore-stub';
import {SharedModule} from '../shared/shared.module';

describe('PharosProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: PharosProfileService = TestBed.get(PharosProfileService);
    expect(service).toBeTruthy();
  });
});
