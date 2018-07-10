import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetListPanelComponent } from './target-list-panel.component';

describe('TargetListPanelComponent', () => {
  let component: TargetListPanelComponent;
  let fixture: ComponentFixture<TargetListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetListPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
