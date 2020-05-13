import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseCardComponent } from './disease-card.component';
import {TESTTARGET, TESTTARGETPROPS} from "../../../../../../../../test/test-target";

describe('DiseaseCardComponent', () => {
  let component: DiseaseCardComponent;
  let fixture: ComponentFixture<DiseaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseCardComponent);
    component = fixture.componentInstance;
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
