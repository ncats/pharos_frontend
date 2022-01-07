import { TestBed, inject } from '@angular/core/testing';

import { HelpDataService } from './help-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';

describe('HelpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpDataService,
        PharosApiService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ]
    });
  });

  it('should be created', inject([HelpDataService], (service: HelpDataService) => {
    expect(service).toBeTruthy();
  }));
});
