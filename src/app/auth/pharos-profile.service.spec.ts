import {TestBed} from '@angular/core/testing';

import {PharosProfileService} from './pharos-profile.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {SharedModule} from '../shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {COMMON_CONFIG} from '../../../test/test-config';


describe('PharosProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
      AngularFireModule.initializeApp(COMMON_CONFIG),
    ],
    providers: [
      AngularFireAuth,
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
    ]
  }));

  it('should be created', () => {
    const service: PharosProfileService = TestBed.get(PharosProfileService);
    expect(service).toBeTruthy();
  });
});
