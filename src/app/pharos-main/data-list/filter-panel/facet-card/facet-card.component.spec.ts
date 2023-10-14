import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetCardComponent } from './facet-card.component';

describe('FacetCardComponent', () => {
  let component: FacetCardComponent;
  let fixture: ComponentFixture<FacetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
