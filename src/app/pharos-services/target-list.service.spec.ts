import {TestBed} from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TargetListService } from './target-list.service';
import {FIRESTORESTUB} from '../../../test/firestore-stub';

describe('TargetListService', () => {
  let service: TargetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
    service = TestBed.inject(TargetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
