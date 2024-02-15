import { TestBed } from '@angular/core/testing';

import { FeatureTrackingService } from './feature-tracking.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {Apollo} from 'apollo-angular';
import {PharosApiService} from './pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FeatureTrackingService', () => {
  let service: FeatureTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        Apollo,
        PharosApiService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
    service = TestBed.inject(FeatureTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
