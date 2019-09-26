import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNodeGeneratorComponent } from './topic-node-generator.component';

describe('TopicNodeGeneratorComponent', () => {
  let component: TopicNodeGeneratorComponent;
  let fixture: ComponentFixture<TopicNodeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNodeGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
