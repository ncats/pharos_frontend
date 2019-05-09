import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ColorLegendComponent } from './d3-color-legend.component';

describe('D3ColorLegendComponent', () => {
  let component: D3ColorLegendComponent;
  let fixture: ComponentFixture<D3ColorLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3ColorLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ColorLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
