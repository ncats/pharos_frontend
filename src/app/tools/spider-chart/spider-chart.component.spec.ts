import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiderChartComponent } from './spider-chart.component';

describe('SpiderChartComponent', () => {
  let component: SpiderChartComponent;
  let fixture: ComponentFixture<SpiderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
