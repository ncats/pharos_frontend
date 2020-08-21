import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetHistogramComponent } from './facet-histogram.component';

describe('FacetHistogramComponent', () => {
  let component: FacetHistogramComponent;
  let fixture: ComponentFixture<FacetHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
