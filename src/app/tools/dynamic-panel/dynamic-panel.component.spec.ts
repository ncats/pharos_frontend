import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPanelComponent } from './dynamic-panel.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';

describe('DynamicPanelComponent', () => {
  let component: DynamicPanelComponent;
  let fixture: ComponentFixture<DynamicPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
      declarations: [ DynamicPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
