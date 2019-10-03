import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphPanelComponent } from './topic-graph-panel.component';
import {SGNode} from 'smrtgraph-core';
import {SharedModule} from '../../../../../shared/shared.module';
import {TopicGraphFiltersComponent} from './topic-graph-filters/topic-graph-filters.component';
import {NodeMenuPopupComponent} from './node-menu-popup/node-menu-popup.component';
import {NodeDetailsBoxComponent} from './node-details-box/node-details-box.component';
import {TargetCardComponent} from '../../../../data-list/cards/target-card/target-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';

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
        TopicGraphPanelComponent,
        TargetCardComponent,
        LigandCardComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule
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
