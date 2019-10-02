import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPlotComponent } from './scatter-plot.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonToolsModule} from '../../common-tools.module';

describe('ScatterPlotComponent', () => {
  let component: ScatterPlotComponent;
  let fixture: ComponentFixture<ScatterPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScatterPlotComponent
      ],
      imports: [
        SharedModule,
        CommonToolsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
