import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentialPanelComponent } from './differential-panel.component';

describe('DifferentialPanelComponent', () => {
  let component: DifferentialPanelComponent;
  let fixture: ComponentFixture<DifferentialPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferentialPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentialPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
