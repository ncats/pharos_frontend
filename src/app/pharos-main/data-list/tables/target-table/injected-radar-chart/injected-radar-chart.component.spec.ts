import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectedRadarChartComponent } from './injected-radar-chart.component';

describe('InjectedRadarChartComponent', () => {
  let component: InjectedRadarChartComponent;
  let fixture: ComponentFixture<InjectedRadarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectedRadarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectedRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
