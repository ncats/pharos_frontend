import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsetPlotComponent } from './upset-plot.component';

describe('UpsetPlotComponent', () => {
  let component: UpsetPlotComponent;
  let fixture: ComponentFixture<UpsetPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsetPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsetPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
