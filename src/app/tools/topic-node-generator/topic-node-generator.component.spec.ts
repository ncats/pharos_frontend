import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNodeGeneratorComponent } from './topic-node-generator.component';
import {SharedModule} from '../../shared/shared.module';

describe('TopicNodeGeneratorComponent', () => {
  let component: TopicNodeGeneratorComponent;
  let fixture: ComponentFixture<TopicNodeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNodeGeneratorComponent ],
      imports: [
        SharedModule
      ]
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
