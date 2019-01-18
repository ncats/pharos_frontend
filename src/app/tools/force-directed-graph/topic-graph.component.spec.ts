import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphComponent } from './topic-graph.component';

describe('TopicGraphComponent', () => {
  let component: TopicGraphComponent;
  let fixture: ComponentFixture<TopicGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
