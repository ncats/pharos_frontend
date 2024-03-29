import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartComponent } from './donut-chart.component';

describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
    component.data = [{label: 'tim', count: 666}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
