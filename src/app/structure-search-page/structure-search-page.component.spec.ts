import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import { StructureSearchPageComponent } from './structure-search-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StructureSearchPageComponent', () => {
  let component: StructureSearchPageComponent;
  let fixture: ComponentFixture<StructureSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
