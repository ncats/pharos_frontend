import { TestBed } from '@angular/core/testing';

import { PharosAuthService } from './pharos-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {SharedModule} from '../shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';


// https://stackoverflow.com/questions/45121529/mock-angularfireauth-when-unit-testing-an-angular-service

describe('PharosAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
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
