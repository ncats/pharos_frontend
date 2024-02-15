import {async, TestBed} from '@angular/core/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../test/test-config';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../test/mock-activate-route';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
          HttpClientTestingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
