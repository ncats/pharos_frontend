import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTableComponent } from './target-table.component';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../../shared/shared.module';
import {PharosMainRoutingModule} from '../../../pharos-main-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {PharosPaginatorComponent} from '../../../../tools/pharos-paginator/pharos-paginator.component';
import {RadarChartComponent} from '../../../../tools/visualizations/radar-chart/radar-chart.component';
import {RadarService} from '../../../../tools/visualizations/radar-chart/radar.service';
import {ResponseParserService} from '../../../../pharos-services/response-parser.service';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';

describe('TargetTableComponent', () => {
  let component: TargetTableComponent;
  let fixture: ComponentFixture<TargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        RadarService,
        ResponseParserService,
        PharosApiService
      ],
      declarations: [ TargetTableComponent, PharosPaginatorComponent, RadarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
