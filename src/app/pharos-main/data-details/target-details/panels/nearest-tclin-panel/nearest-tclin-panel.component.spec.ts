import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestTclinPanelComponent } from './nearest-tclin-panel.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('NearestTclinPanelComponent', () => {
  let component: NearestTclinPanelComponent;
  let fixture: ComponentFixture<NearestTclinPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          ApolloTestingModule,
          HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)],
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestTclinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
