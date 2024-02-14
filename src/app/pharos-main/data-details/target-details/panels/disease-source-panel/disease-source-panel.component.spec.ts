import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSourceComponent } from './disease-source-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DiseaseSourceComponent', () => {
  let component: DiseaseSourceComponent;
  let fixture: ComponentFixture<DiseaseSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          BrowserAnimationsModule,
        ApolloTestingModule,
        RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSourceComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
