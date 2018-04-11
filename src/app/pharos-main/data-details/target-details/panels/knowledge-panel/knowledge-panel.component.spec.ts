import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgePanelComponent } from './knowledge-panel.component';

describe('KnowledgePanelComponent', () => {
  let component: KnowledgePanelComponent;
  let fixture: ComponentFixture<KnowledgePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
