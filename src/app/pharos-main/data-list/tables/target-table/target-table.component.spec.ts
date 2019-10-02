import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetTableComponent} from './target-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RadarChartComponent} from '../../../../tools/visualizations/radar-chart/radar-chart.component';
import {RadarService} from '../../../../tools/visualizations/radar-chart/radar.service';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {GenericTableModule} from '../../../../tools/generic-table/generic-table.module';
import {RadarChartModule} from '../../../../tools/visualizations/radar-chart/radar-chart.module';
import {PharosPaginatorModule} from '../../../../tools/pharos-paginator/pharos-paginator.module';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';

describe('TargetTableComponent', () => {
  let component: TargetTableComponent;
  let fixture: ComponentFixture<TargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule,
        RadarChartModule,
        PharosPaginatorModule
      ],
      providers: [
        { provide: RouterModule, useClass: RouterTestingModule },
        RadarService,
        PharosApiService
      ],
      declarations: [
        TargetTableComponent
      ]
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
