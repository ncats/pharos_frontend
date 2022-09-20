import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCircleComponent } from './pack-circle.component';
import {TestCirclePlot} from "../../../../../test/test-circle-plot";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../test/mock-activate-route";

describe('PackCircleComponent', () => {
  let component: PackCircleComponent;
  let fixture: ComponentFixture<PackCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackCircleComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCircleComponent);
    component = fixture.componentInstance;
    component.config = {
      highlightCheck: null,
      focusedCheck: null,
      circleClick: null
    };
    component.hierarchyData = TestCirclePlot;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
