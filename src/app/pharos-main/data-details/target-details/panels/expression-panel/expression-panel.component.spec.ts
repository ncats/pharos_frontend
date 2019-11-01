import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPanelComponent } from './expression-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {RadarService} from '../../../../../tools/visualizations/radar-chart/radar.service';
import {SharedDetailsModule} from '../../../../../shared/shared-details.module';
import {DiseaseSourceComponent} from '../disease-source-panel/disease-source-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RadarChartModule} from '../../../../../tools/visualizations/radar-chart/radar-chart.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {DifferentialPanelComponent} from './differential-panel/differential-panel.component';
import {OrthologPanelComponent} from './ortholog-panel/ortholog-panel.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ExpressionPanelComponent', () => {
  let component: ExpressionPanelComponent;
  let fixture: ComponentFixture<ExpressionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        SharedDetailsModule,
        RadarChartModule,
        GenericTableModule,
        CommonToolsModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      providers: [
      ],
      declarations: [
        DifferentialPanelComponent,
        OrthologPanelComponent,
        ExpressionPanelComponent,
        DiseaseSourceComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPanelComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.sources = [];
    component.data = {
        loaded: true,
        diseases: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
