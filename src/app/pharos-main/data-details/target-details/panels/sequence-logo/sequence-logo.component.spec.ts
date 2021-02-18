import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceLogoComponent } from './sequence-logo.component';
import {TESTTARGET} from "../../../../../../../test/test-target";

describe('SequenceLogoComponent', () => {
  let component: SequenceLogoComponent;
  let fixture: ComponentFixture<SequenceLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceLogoComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
