import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetLigandHeatmapComponent } from './target-ligand-heatmap.component';

describe('TargetDiseaseHeatmapComponent', () => {
  let component: TargetLigandHeatmapComponent;
  let fixture: ComponentFixture<TargetLigandHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetLigandHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetLigandHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
