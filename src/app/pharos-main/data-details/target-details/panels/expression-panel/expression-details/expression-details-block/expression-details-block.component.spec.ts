import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDetailsBlockComponent } from './expression-details-block.component';

describe('ExpressionDetailsBlockComponent', () => {
  let component: ExpressionDetailsBlockComponent;
  let fixture: ComponentFixture<ExpressionDetailsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDetailsBlockComponent);
    component = fixture.componentInstance;
    component.expressions = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
