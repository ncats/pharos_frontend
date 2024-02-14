import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViralInteractionPanelComponent } from './viral-interaction-panel.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('ViralInteractionPanelComponent', () => {
  let component: ViralInteractionPanelComponent;
  let fixture: ComponentFixture<ViralInteractionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViralInteractionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
