import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceAlignmentsComponent } from './sequence-alignments.component';

describe('SequenceAlignmentsComponent', () => {
  let component: SequenceAlignmentsComponent;
  let fixture: ComponentFixture<SequenceAlignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceAlignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceAlignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
