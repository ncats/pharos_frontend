import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseRelevancePanelComponent } from './disease-relevance-panel.component';

describe('DiseaseRelevancePanelComponent', () => {
  let component: DiseaseRelevancePanelComponent;
  let fixture: ComponentFixture<DiseaseRelevancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseRelevancePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseRelevancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
