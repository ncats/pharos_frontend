import {inject, TestBed} from '@angular/core/testing';

import {SelectedFacetService} from './selected-facet.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('SelectedFacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        RouterTestingModule,
        ApolloTestingModule
      ],
      providers: [
        PharosApiService,
        SelectedFacetService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
  });

  it('should be created', inject([SelectedFacetService], (service: SelectedFacetService) => {
    expect(service).toBeTruthy();
  }));
});
