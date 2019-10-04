import { TestBed } from '@angular/core/testing';

import { GraphParserService } from './graph-parser.service';
import {LinkService, NodeService} from 'smrtgraph-core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../../test/firestore-stub';

describe('GraphParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NodeService,
      LinkService,
      { provide: AngularFirestore, useValue: FIRESTORESTUB }
    ]
  }));

  it('should be created', () => {
    const service: GraphParserService = TestBed.get(GraphParserService);
    expect(service).toBeTruthy();
  });
});
