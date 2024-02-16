import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsHeaderComponent } from './ncats-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SuggestApiService} from '../search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Apollo} from "apollo-angular";
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NcatsHeaderComponent', () => {
  let component: NcatsHeaderComponent;
  let fixture: ComponentFixture<NcatsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
          HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        SuggestApiService,
        AngularFireAuth,
        Apollo,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
