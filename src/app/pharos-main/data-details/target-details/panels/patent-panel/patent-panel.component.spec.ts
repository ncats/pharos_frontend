import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentPanelComponent } from './patent-panel.component';

describe('PatentPanelComponent', () => {
  let component: PatentPanelComponent;
  let fixture: ComponentFixture<PatentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
