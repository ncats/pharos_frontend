import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPanelBaseComponent } from './target-panel-base.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('TargetPanelBaseComponent', () => {
  let component: TargetPanelBaseComponent;
  let fixture: ComponentFixture<TargetPanelBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPanelBaseComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.child = component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
