import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchComponent } from './sequence-search.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('SequenceAlignmentsComponent', () => {
  let component: SequenceSearchComponent;
  let fixture: ComponentFixture<SequenceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
          HttpClientTestingModule,
          ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
