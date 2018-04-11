import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPanelComponent } from './expression-panel.component';

describe('ExpressionPanelComponent', () => {
  let component: ExpressionPanelComponent;
  let fixture: ComponentFixture<ExpressionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
