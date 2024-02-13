import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import { StructureSearchPageComponent } from './structure-search-page.component';
import {CommonToolsModule} from '../tools/common-tools.module';
import {SharedModule} from '../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';

describe('StructureSearchPageComponent', () => {
  let component: StructureSearchPageComponent;
  let fixture: ComponentFixture<StructureSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StructureSearchPageComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonToolsModule,
        SharedModule,
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
