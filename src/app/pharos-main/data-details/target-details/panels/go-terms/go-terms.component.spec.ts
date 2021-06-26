import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTermsComponent } from './go-terms.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {SharedModule} from '../../../../../shared/shared.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';

describe('GoTermsComponent', () => {
  let component: GoTermsComponent;
  let fixture: ComponentFixture<GoTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoTermsComponent ],
      imports: [
        SharedModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoTermsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.targetProps = TESTTARGETPROPS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
