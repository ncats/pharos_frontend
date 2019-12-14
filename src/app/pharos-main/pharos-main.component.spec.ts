import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosMainComponent } from './pharos-main.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';
import {SharedModule} from '../shared/shared.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireModule} from '@angular/fire';
import {NavSectionsService} from '../tools/sidenav-panel/services/nav-sections.service';

describe('PharosMainComponent', () => {
  let component: PharosMainComponent;
  let fixture: ComponentFixture<PharosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers: [
        ComponentInjectorService,
        NavSectionsService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
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
