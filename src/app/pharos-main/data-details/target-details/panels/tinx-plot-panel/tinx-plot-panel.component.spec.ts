import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxPlotPanelComponent } from './tinx-plot-panel.component';

describe('TinxPlotPanelComponent', () => {
  let component: TinxPlotPanelComponent;
  let fixture: ComponentFixture<TinxPlotPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinxPlotPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxPlotPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
