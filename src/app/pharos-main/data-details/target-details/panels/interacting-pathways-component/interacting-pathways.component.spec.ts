import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractingPathwaysComponent } from './interacting-pathways.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('InteractingPathwaysComponent', () => {
  let component: InteractingPathwaysComponent;
  let fixture: ComponentFixture<InteractingPathwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractingPathwaysComponent);
    component = fixture.componentInstance;
    component.data.targets = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
