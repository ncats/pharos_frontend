import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAssociationDetailsComponent } from './disease-association-details.component';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {FIRESTORESTUB} from "../../../../../../../test/firestore-stub";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {TESTTARGET} from "../../../../../../../test/test-target";

describe('DiseaseAssociationDetailsComponent', () => {
  let component: DiseaseAssociationDetailsComponent;
  let fixture: ComponentFixture<DiseaseAssociationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseAssociationDetailsComponent ],
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
