import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinProteinPanelComponent } from './protein-protein-panel.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProteinProteinPanelComponent', () => {
  let component: ProteinProteinPanelComponent;
  let fixture: ComponentFixture<ProteinProteinPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinProteinPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET};
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
