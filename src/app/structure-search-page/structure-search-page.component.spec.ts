import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSearchPageComponent } from './structure-search-page.component';
import {CommonToolsModule} from '../tools/common-tools.module';
import {SharedModule} from '../shared/shared.module';
import {SketcherModule} from '../tools/marvin-sketcher/sketcher.module';
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
        SketcherModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
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
