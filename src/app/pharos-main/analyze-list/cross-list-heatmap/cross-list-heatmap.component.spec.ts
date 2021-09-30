import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossListHeatmapComponent } from './cross-list-heatmap.component';

describe('CrossListHeatmapComponent', () => {
  let component: CrossListHeatmapComponent;
  let fixture: ComponentFixture<CrossListHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossListHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossListHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
