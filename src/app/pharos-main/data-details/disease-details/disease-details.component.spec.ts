import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetailsComponent } from './disease-details.component';

describe('DiseaseDetailsComponent', () => {
  let component: DiseaseDetailsComponent;
  let fixture: ComponentFixture<DiseaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
