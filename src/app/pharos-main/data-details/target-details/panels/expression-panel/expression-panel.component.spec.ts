import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPanelComponent } from './expression-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {RadarService} from '../../../../../tools/visualizations/radar-chart/radar.service';
import {SharedDetailsModule} from '../../../../../shared/shared-details.module';
import {DiseaseSourceComponent} from '../disease-source-panel/disease-source-panel.component';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ExpressionPanelComponent', () => {
  let component: ExpressionPanelComponent;
  let fixture: ComponentFixture<ExpressionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        SharedDetailsModule,
        BrowserAnimationsModule
      ],
      providers: [
        RadarService,
        EnvironmentVariablesService
      ],
      declarations: [
        ExpressionPanelComponent,
        RadarChartComponent,
        DiseaseSourceComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
