import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDetailsCardComponent } from './prediction-details-card.component';

describe('PredictionDetailsComponent', () => {
  let component: PredictionDetailsCardComponent;
  let fixture: ComponentFixture<PredictionDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
