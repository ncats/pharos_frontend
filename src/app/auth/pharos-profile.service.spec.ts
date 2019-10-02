import { TestBed } from '@angular/core/testing';

import { PharosProfileService } from './pharos-profile.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {SharedModule} from '../shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
import {inject} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import * as firebase from 'firebase/app';

/*
// An anonymous user
const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
} as firebase.User;

const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInAnonymously': Promise.reject({
      code: 'auth/operation-not-allowed'
    }),
    // 'signInWithPopup': Promise.reject(),
    // 'signOut': Promise.reject()
  }),
  authState: of(authState)
};*/

describe('PharosProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
      AngularFireModule.initializeApp(COMMON_CONFIG)

    ],
    providers: [
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
      AngularFireAuth
    ]
  }));

  it('should be created', inject([ PharosProfileService ], (service: PharosProfileService) => {
    expect(service).toBeTruthy();
  }));
});
