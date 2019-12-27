import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetCardComponent } from './target-card.component';
import {SharedModule} from '../../../../shared/shared.module';
import {RadarChartModule} from '../../../../tools/visualizations/radar-chart/radar-chart.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {TESTTARGET} from '../../../../../../test/test-target';

describe('TargetCardComponent', () => {
  let component: TargetCardComponent;
  let fixture: ComponentFixture<TargetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetCardComponent ],
      imports: [
        SharedModule,
        CommonToolsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RouterModule, useClass: RouterTestingModule }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCardComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
