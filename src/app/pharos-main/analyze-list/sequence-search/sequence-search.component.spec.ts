import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchComponent } from './sequence-search.component';

describe('SequenceAlignmentsComponent', () => {
  let component: SequenceSearchComponent;
  let fixture: ComponentFixture<SequenceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
