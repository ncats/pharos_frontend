import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSaveModalComponent } from './topic-save-modal.component';

describe('TopicSaveModalComponent', () => {
  let component: TopicSaveModalComponent;
  let fixture: ComponentFixture<TopicSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSaveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
