import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationStatisticsComponent } from './publication-statistics.component';
import {AaSequencePanelComponent} from '../aa-sequence-panel/aa-sequence-panel.component';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {ActivatedRoute} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {SharedModule} from '../../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';

describe('PublicationStatisticsComponent', () => {
  let component: PublicationStatisticsComponent;
  let fixture: ComponentFixture<PublicationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationStatisticsComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
