import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseRelevancePanelComponent } from './disease-relevance-panel.component';
import {MaterialModule} from "../../../../../../assets/material/material.module";
import {SharedModule} from "../../../../../shared/shared.module";

describe('DiseaseRelevancePanelComponent', () => {
  let component: DiseaseRelevancePanelComponent;
  let fixture: ComponentFixture<DiseaseRelevancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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
