import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosTabsComponent } from './pharos-tabs.component';
import {SharedModule} from "../../shared/shared.module";

describe('PharosTabsComponent', () => {
  let component: PharosTabsComponent;
  let fixture: ComponentFixture<PharosTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
