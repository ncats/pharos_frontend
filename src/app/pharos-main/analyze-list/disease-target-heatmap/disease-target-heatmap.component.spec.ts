import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTargetHeatmapComponent } from './disease-target-heatmap.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';

describe('DiseaseTargetHeatmapComponent', () => {
  let component: DiseaseTargetHeatmapComponent;
  let fixture: ComponentFixture<DiseaseTargetHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
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
