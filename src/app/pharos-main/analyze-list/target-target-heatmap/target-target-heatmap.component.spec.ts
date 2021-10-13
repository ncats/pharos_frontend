import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTargetHeatmapComponent } from './target-target-heatmap.component';

describe('TargetDiseaseHeatmapComponent', () => {
  let component: TargetTargetHeatmapComponent;
  let fixture: ComponentFixture<TargetTargetHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetTargetHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTargetHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
