import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetLigandHeatmapComponent } from './target-ligand-heatmap.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';

describe('TargetLigandHeatmapComponent', () => {
  let component: TargetLigandHeatmapComponent;
  let fixture: ComponentFixture<TargetLigandHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
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
