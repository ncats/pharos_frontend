import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusDetailsComponent } from './virus-details.component';
import {ViralInteractionDetails, VirusDetails} from "../../../../../../models/virus-interactions";
import {InteractionDetails} from "../../../../../../models/interaction-details";

describe('VirusDetailsComponent', () => {
  let component: VirusDetailsComponent;
  let fixture: ComponentFixture<VirusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirusDetailsComponent);
    component = fixture.componentInstance;
    component.virus = {name: "viridae", interactionDetails: [new ViralInteractionDetails({protein_name: "gag-pol", finalLR: 123} as ViralInteractionDetails)]} as VirusDetails;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
