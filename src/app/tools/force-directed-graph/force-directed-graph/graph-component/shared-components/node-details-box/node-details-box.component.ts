import {Component, OnInit} from '@angular/core';
import {PharosNodeService} from
    '../../../../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service';
import {LinkService} from '../../services/event-tracking/link.service';
import {Link} from '../../models/link';
import {GraphDataService} from '../../services/graph-data.service';
import {PharosD3Service} from
    '../../../../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service';
import {Node} from '../../../../../visualizations/force-directed-graph/models/node';

@Component({
  selector: 'app-node-details-box',
  templateUrl: './node-details-box.component.html',
  styleUrls: ['./node-details-box.component.scss']
})
export class NodeDetailsBoxComponent implements OnInit {

  node: Node;
  link: Link;

  constructor(private nodeService: PharosNodeService,
              private linkService: LinkService,
              private d3Service: PharosD3Service,
              private graphDataService: GraphDataService) {
  }

  ngOnInit() {
    this.nodeService.nodeList$.subscribe(res => this.node = res.hovered[0]);
    this.linkService.linkslist$.subscribe(res => this.link = res.hovered[0]);
  }

  getLabel(value: number): string {
    if (!value || value === -100) {
      return 'no data';
    } else {
      return value.toExponential(2);
    }
  }

  foundNode(event) {
    this.d3Service._clearNodes();
    this.nodeService.hoveredNode([event]);
    this.d3Service._manualClick(event, this.graphDataService.returnGraph());
  }
}
