import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAssociationGridComponent } from './disease-association-grid.component';

describe('DiseaseAssociationGridComponent', () => {
  let component: DiseaseAssociationGridComponent;
  let fixture: ComponentFixture<DiseaseAssociationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseAssociationGridComponent);
    component = fixture.componentInstance;
    component.associations = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
