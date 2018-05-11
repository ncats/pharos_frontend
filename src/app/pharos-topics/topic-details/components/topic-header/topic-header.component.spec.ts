import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHeaderComponent } from './topic-header.component';
import {SharedModule} from "../../../../shared/shared.module";
import {Topic} from "../../../../models/topic";

describe('TopicHeaderComponent', () => {
  let component: TopicHeaderComponent;
  let fixture: ComponentFixture<TopicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ TopicHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHeaderComponent);
    component = fixture.componentInstance;
    component.topic = new Topic({name: "sdfsdf", description: 'sdfgsdfsdf'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
