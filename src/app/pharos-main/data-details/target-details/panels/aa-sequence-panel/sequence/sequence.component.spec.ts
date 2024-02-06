import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SequenceComponent } from './sequence.component';
import {TESTTARGET} from '../../../../../../../../test/test-target';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
