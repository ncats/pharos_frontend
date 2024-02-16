import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExploreListButtonComponent} from './explore-list-button.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ExploreListButtonComponent', () => {
  let component: ExploreListButtonComponent;
  let fixture: ComponentFixture<ExploreListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        {provide: AngularFirestore, useValue: FIRESTORESTUB}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreListButtonComponent);
    component = fixture.componentInstance;
    component.path = '/diseases';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
