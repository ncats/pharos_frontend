import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthologPanelComponent } from './ortholog-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrthologPanelComponent', () => {
  let component: OrthologPanelComponent;
  let fixture: ComponentFixture<OrthologPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ApolloTestingModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(OrthologPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
