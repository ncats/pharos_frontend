import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseAssociationComponent } from './disease-association.component';
import {TESTTARGET} from "../../../../../../../../test/test-target";

describe('DiseaseAssociationComponent', () => {
  let component: DiseaseAssociationComponent;
  let fixture: ComponentFixture<DiseaseAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseAssociationComponent);
    component = fixture.componentInstance;
    component.association = TESTTARGET.diseases[0].associations[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
