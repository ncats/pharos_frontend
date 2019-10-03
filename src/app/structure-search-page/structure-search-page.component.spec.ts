import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSearchPageComponent } from './structure-search-page.component';
import {CommonToolsModule} from '../tools/common-tools.module';
import {SharedModule} from '../shared/shared.module';
import {SketcherModule} from '../tools/marvin-sketcher/sketcher.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('StructureSearchPageComponent', () => {
  let component: StructureSearchPageComponent;
  let fixture: ComponentFixture<StructureSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StructureSearchPageComponent
      ],
      imports: [
        RouterTestingModule,
        CommonToolsModule,
        SketcherModule,
        SharedModule
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
