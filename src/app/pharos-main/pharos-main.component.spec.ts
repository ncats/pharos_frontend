import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosMainComponent } from './pharos-main.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';
import {NavSectionsService} from '../tools/sidenav-panel/services/nav-sections.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PharosMainComponent', () => {
  let component: PharosMainComponent;
  let fixture: ComponentFixture<PharosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        NavSectionsService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
