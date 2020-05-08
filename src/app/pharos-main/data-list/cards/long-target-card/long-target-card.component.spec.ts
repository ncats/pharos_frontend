import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTargetCardComponent } from './long-target-card.component';

describe('LongTargetCardComponent', () => {
  let component: LongTargetCardComponent;
  let fixture: ComponentFixture<LongTargetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTargetCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTargetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
