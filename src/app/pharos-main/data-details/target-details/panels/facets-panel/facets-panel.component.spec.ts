import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetsPanelComponent } from './facets-panel.component';

describe('FacetsPanelComponent', () => {
  let component: FacetsPanelComponent;
  let fixture: ComponentFixture<FacetsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
