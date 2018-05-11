import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTableComponent } from './disease-table.component';
import {SharedListModule} from "../../../shared/shared-list.module";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DiseaseTableComponent', () => {
  let component: DiseaseTableComponent;
  let fixture: ComponentFixture<DiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ DiseaseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
