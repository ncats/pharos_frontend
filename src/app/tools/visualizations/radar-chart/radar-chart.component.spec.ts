import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartComponent } from './radar-chart.component';
import {RadarService} from './radar.service';
import {HttpClientModule} from '@angular/common/http';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';

describe('RadarChartComponent', () => {
  let component: RadarChartComponent;
  let fixture: ComponentFixture<RadarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RadarService,
        EnvironmentVariablesService
      ],
      declarations: [ RadarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartComponent);
    component = fixture.componentInstance;
    component.id = 0;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
