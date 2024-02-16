import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import {ApiPageComponent} from './api-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';
import {UnfurlingMetaService} from "../pharos-services/unfurling-meta.service";
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ApiPageComponent', () => {
  let component: ApiPageComponent;
  let fixture: ComponentFixture<ApiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/index' },
        UnfurlingMetaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
