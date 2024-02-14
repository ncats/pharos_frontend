import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseSummaryComponent } from './disease-summary.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTTARGET} from '../../../../../../test/test-target';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';

describe('DiseaseSummaryComponent', () => {
  let component: DiseaseSummaryComponent;
  let fixture: ComponentFixture<DiseaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UnfurlingMetaService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
        ],
      imports: [
        BrowserAnimationsModule,
        ApolloTestingModule,
        RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSummaryComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data.diseases = TESTTARGET.diseases[0];
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
