import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseAssociationDetailsComponent } from './disease-association-details.component';
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {TESTTARGET} from "../../../../../../../test/test-target";

describe('DiseaseAssociationDetailsComponent', () => {
  let component: DiseaseAssociationDetailsComponent;
  let fixture: ComponentFixture<DiseaseAssociationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseAssociationDetailsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
