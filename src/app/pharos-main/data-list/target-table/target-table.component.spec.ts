import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTableComponent } from './target-table.component';
import {MaterialModule} from "../../../../assets/material/material.module";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../../shared/shared.module";
import {PharosMainRoutingModule} from "../../pharos-main-routing.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('TargetTableComponent', () => {
  let component: TargetTableComponent;
  let fixture: ComponentFixture<TargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ TargetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
