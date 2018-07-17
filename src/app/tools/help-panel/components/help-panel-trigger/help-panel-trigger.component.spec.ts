import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPanelTriggerComponent } from './help-panel-trigger.component';

describe('HelpPanelTriggerComponent', () => {
  let component: HelpPanelTriggerComponent;
  let fixture: ComponentFixture<HelpPanelTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPanelTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPanelTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
