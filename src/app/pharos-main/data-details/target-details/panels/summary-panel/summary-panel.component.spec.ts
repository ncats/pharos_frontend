import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPanelComponent } from './summary-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {RadarService} from '../../../../../tools/radar-chart/radar.service';
import {RadarChartComponent} from '../../../../../tools/radar-chart/radar-chart.component';

describe('SummaryPanelComponent', () => {
  let component: SummaryPanelComponent;
  let fixture: ComponentFixture<SummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [RadarService],
      declarations: [ SummaryPanelComponent, RadarChartComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
