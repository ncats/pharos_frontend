import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import { SequenceSearchPageComponent } from './sequence-search-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SequenceSearchPageComponent', () => {
  let component: SequenceSearchPageComponent;
  let fixture: ComponentFixture<SequenceSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
