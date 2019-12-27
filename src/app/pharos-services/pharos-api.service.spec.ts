import {inject, TestBed} from '@angular/core/testing';

import {PharosApiService} from './pharos-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {Apollo} from 'apollo-angular';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';

describe('PharosApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        Apollo,
        PharosApiService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
  });

  it('should be created', inject([PharosApiService], (service: PharosApiService) => {
    expect(service).toBeTruthy();
  }));
});
