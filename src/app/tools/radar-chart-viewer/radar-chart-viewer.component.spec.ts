import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartViewerComponent } from './radar-chart-viewer.component';

describe('RadarChartViewerComponent', () => {
  let component: RadarChartViewerComponent;
  let fixture: ComponentFixture<RadarChartViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarChartViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
