import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPanelBaseComponent } from './target-panel-base.component';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('TargetPanelBaseComponent', () => {
  let component: TargetPanelBaseComponent;
  let fixture: ComponentFixture<TargetPanelBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetPanelBaseComponent ]
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
