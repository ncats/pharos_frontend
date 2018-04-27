import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSourceComponent } from './disease-source-panel.component';
import {SharedModule} from "../../../../../shared/shared.module";

describe('DiseaseSourceComponent', () => {
  let component: DiseaseSourceComponent;
  let fixture: ComponentFixture<DiseaseSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ DiseaseSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
