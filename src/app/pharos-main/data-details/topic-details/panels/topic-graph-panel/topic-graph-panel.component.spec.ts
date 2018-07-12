import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphPanelComponent } from './topic-graph-panel.component';

describe('TopicGraphPanelComponent', () => {
  let component: TopicGraphPanelComponent;
  let fixture: ComponentFixture<TopicGraphPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicGraphPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicGraphPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
