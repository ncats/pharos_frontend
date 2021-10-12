import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDiseaseHeatmapComponent } from './disease-target-heatmap.component';

describe('TargetDiseaseHeatmapComponent', () => {
  let component: TargetDiseaseHeatmapComponent;
  let fixture: ComponentFixture<TargetDiseaseHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetDiseaseHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDiseaseHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
