import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartViewerComponent } from './radar-chart-viewer.component';
import {TargetHeaderComponent} from '../../pharos-main/data-details/target-details/target-header/target-header.component';
import {SharedModule} from '../../shared/shared.module';
import {CommonToolsModule} from '../common-tools.module';

describe('RadarChartViewerComponent', () => {
  let component: RadarChartViewerComponent;
  let fixture: ComponentFixture<RadarChartViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CommonToolsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartViewerComponent);
    component = fixture.componentInstance;
    component.data = [[]];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
