import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphFiltersComponent } from './topic-graph-filters.component';
import {SharedDetailsModule} from '../../../../../../shared/shared-details.module';

describe('TopicGraphFiltersComponent', () => {
  let component: TopicGraphFiltersComponent;
  let fixture: ComponentFixture<TopicGraphFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicGraphFiltersComponent ],
      imports: [
        SharedDetailsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicGraphFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
