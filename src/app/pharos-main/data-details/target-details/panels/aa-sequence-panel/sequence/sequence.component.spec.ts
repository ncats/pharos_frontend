import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceComponent } from './sequence.component';
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {TESTTARGET} from "../../../../../../../../test/test-target";

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [ SequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
