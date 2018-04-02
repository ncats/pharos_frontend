import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSourcesPanelComponent } from './disease-sources-panel.component';

describe('DiseaseSourcesPanelComponent', () => {
  let component: DiseaseSourcesPanelComponent;
  let fixture: ComponentFixture<DiseaseSourcesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseSourcesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSourcesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
