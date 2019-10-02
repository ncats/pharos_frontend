import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphPanelComponent } from './topic-graph-panel.component';
import {SGNode} from 'smrtgraph-core';
import {SharedModule} from '../../../../../shared/shared.module';
import {TopicGraphFiltersComponent} from './topic-graph-filters/topic-graph-filters.component';
import {NodeMenuPopupComponent} from './node-menu-popup/node-menu-popup.component';
import {NodeDetailsBoxComponent} from './node-details-box/node-details-box.component';

class T extends SGNode {
}

describe('TopicGraphPanelComponent', () => {
  let component: TopicGraphPanelComponent<T>;
  let fixture: ComponentFixture<TopicGraphPanelComponent<T>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicGraphFiltersComponent,
        NodeMenuPopupComponent,
        NodeDetailsBoxComponent,
        TopicGraphPanelComponent
      ],
      imports: [
        SharedModule
      ]
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
