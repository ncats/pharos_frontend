import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandTargetHeatmapComponent } from './ligand-target-heatmap.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';

describe('LigandTargetHeatmapComponent', () => {
  let component: LigandTargetHeatmapComponent;
  let fixture: ComponentFixture<LigandTargetHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      declarations: [ LigandTargetHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandTargetHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
