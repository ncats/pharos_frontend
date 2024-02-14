import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PharosHomeComponent} from './pharos-home.component';
import {SharedModule} from '../shared/shared.module';
import {LoadingService} from '../pharos-services/loading.service';
import {SuggestApiService} from '../tools/search-component/suggest-api.service';

import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTypesPanelComponent} from './data-types-panel/data-types-panel.component';
import {NewsPanelComponent} from './news-panel/news-panel.component';
import {AboutPanelComponent} from './about-panel/about-panel.component';
import {SearchComponentModule} from '../tools/search-component/search-component.module';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import {PharosProfileService} from '../auth/pharos-profile.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('PharosHomeComponent', () => {
  let component: PharosHomeComponent;
  let fixture: ComponentFixture<PharosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        SearchComponentModule,
        ApolloTestingModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers: [
        PharosProfileService,
        AngularFireAuth,
        LoadingService,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        {provide: APP_BASE_HREF, useValue: '/index' }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
