import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRepresentationComponent } from './filter-representation.component';

describe('AnalyzeListComponent', () => {
  let component: FilterRepresentationComponent;
  let fixture: ComponentFixture<FilterRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRepresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
