import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectedRadarChartComponent } from './injected-radar-chart.component';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';

describe('InjectedRadarChartComponent', () => {
  let component: InjectedRadarChartComponent;
  let fixture: ComponentFixture<InjectedRadarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RadarChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectedRadarChartComponent);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
