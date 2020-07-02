import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViralInteractionPanelComponent } from './viral-interaction-panel.component';

describe('ViralInteractionPanelComponent', () => {
  let component: ViralInteractionPanelComponent;
  let fixture: ComponentFixture<ViralInteractionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViralInteractionPanelComponent ]
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
