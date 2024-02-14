import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsPanelComponent } from './predictions-panel.component';

describe('PredictionsPanelComponent', () => {
  let component: PredictionsPanelComponent;
  let fixture: ComponentFixture<PredictionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
