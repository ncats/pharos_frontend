import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHeaderComponent } from './topic-header.component';
import {SharedModule} from '../../../../shared/shared.module';

describe('TopicHeaderComponent', () => {
  let component: TopicHeaderComponent;
  let fixture: ComponentFixture<TopicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicHeaderComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
