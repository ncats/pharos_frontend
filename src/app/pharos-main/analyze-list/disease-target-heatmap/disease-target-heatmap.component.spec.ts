import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTargetHeatmapComponent } from './disease-target-heatmap.component';

describe('TargetDiseaseHeatmapComponent', () => {
  let component: DiseaseTargetHeatmapComponent;
  let fixture: ComponentFixture<DiseaseTargetHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseTargetHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTargetHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
