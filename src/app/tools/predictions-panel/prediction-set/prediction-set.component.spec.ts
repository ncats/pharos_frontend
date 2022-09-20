import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSetComponent } from './prediction-set.component';

describe('PredictionSetComponent', () => {
  let component: PredictionSetComponent;
  let fixture: ComponentFixture<PredictionSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
