import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPanelBaseComponent } from './dynamic-panel-base.component';

describe('DynamicPanelBaseComponent', () => {
  let component: DynamicPanelBaseComponent;
  let fixture: ComponentFixture<DynamicPanelBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPanelBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
