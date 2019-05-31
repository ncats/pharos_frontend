import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetRelevancePanelComponent } from './target-relevance-panel.component';

describe('TargetRelevancePanelComponent', () => {
  let component: TargetRelevancePanelComponent;
  let fixture: ComponentFixture<TargetRelevancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetRelevancePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetRelevancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
