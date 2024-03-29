import { TestBed } from '@angular/core/testing';

import { PharosAuthService } from './pharos-auth.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';


// https://stackoverflow.com/questions/45121529/mock-angularfireauth-when-unit-testing-an-angular-service

describe('PharosAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(COMMON_CONFIG),
    ],
    providers: [
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
      AngularFireAuth
    ]
  }));

  it('should be created', () => {
    const service: PharosAuthService = TestBed.inject(PharosAuthService);
    expect(service).toBeTruthy();
  });
});
