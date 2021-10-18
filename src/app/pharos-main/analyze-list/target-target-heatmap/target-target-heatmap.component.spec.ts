import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTargetHeatmapComponent } from './target-target-heatmap.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';

describe('TargetTargetHeatmapComponent', () => {
  let component: TargetTargetHeatmapComponent;
  let fixture: ComponentFixture<TargetTargetHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
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
