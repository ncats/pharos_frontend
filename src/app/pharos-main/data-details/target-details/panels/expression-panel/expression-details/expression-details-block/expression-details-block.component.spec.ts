import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDetailsBlockComponent } from './expression-details-block.component';

describe('ExpressionDetailsBlockComponent', () => {
  let component: ExpressionDetailsBlockComponent;
  let fixture: ComponentFixture<ExpressionDetailsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionDetailsBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
