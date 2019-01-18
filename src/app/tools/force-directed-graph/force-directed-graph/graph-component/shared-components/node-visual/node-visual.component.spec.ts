import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeVisualComponent } from './node-visual.component';
import {NodeService} from '../../../../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service';
import {NodeMenuControllerService} from '../../services/event-tracking/node-menu-controller.service';
import {Node} from '../../models/node';

describe('NodeVisualComponent', () => {
  let component: NodeVisualComponent;
  let fixture: ComponentFixture<NodeVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeVisualComponent],
      providers: [NodeService, NodeMenuControllerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeVisualComponent);
    component = fixture.componentInstance;
    component.node = new Node('0', {name: 'sdfsdfsdf', label: 'sdgfsdfsdf'});
    component.label = 'dsfsdf';
    component.displayName = 'dfgdfgdfg';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
