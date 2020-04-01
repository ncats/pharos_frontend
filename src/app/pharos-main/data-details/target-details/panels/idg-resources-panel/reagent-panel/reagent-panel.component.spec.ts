import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentPanelComponent } from './reagent-panel.component';

describe('ReagentPanelComponent', () => {
  let component: ReagentPanelComponent;
  let fixture: ComponentFixture<ReagentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
