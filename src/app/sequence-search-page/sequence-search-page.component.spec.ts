import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import { SequenceSearchPageComponent } from './sequence-search-page.component';
import {SharedModule} from '../shared/shared.module';
import {NcatsHeaderModule} from '../tools/ncats-header/ncats-header.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';

describe('SequenceSearchPageComponent', () => {
  let component: SequenceSearchPageComponent;
  let fixture: ComponentFixture<SequenceSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
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
