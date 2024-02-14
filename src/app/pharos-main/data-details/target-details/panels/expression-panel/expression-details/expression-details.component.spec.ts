import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDetailsComponent } from './expression-details.component';

describe('ExpressionDetailsComponent', () => {
  let component: ExpressionDetailsComponent;
  let fixture: ComponentFixture<ExpressionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDetailsComponent);
    component = fixture.componentInstance;
    component.expressions = [];
    component.gtex = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
