import { TestBed } from '@angular/core/testing';

import { GraphDataGeneratorService } from './graph-data-generator.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../../test/test-config';

describe('GraphDataGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(COMMON_CONFIG)
    ],
    providers: [
      { provide: HttpClient, useClass: HttpClientTestingModule },
      { provide: AngularFirestore, useValue: FIRESTORESTUB }
    ]
  }));

  it('should be created', () => {
    const service: GraphDataGeneratorService = TestBed.inject(GraphDataGeneratorService);
    expect(service).toBeTruthy();
  });
});
