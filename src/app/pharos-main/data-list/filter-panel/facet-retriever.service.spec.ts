import {inject, TestBed} from '@angular/core/testing';

import {FacetRetrieverService} from './facet-retriever.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';

describe('FacetRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        PharosApiService,
        FacetRetrieverService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
  });

  it('should be created', inject([FacetRetrieverService], (service: FacetRetrieverService) => {
    expect(service).toBeTruthy();
  }));
});
