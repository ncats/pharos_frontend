import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDiseaseHeatmapComponent } from './target-disease-heatmap.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';

describe('TargetDiseaseHeatmapComponent', () => {
  let component: TargetDiseaseHeatmapComponent;
  let fixture: ComponentFixture<TargetDiseaseHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
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
