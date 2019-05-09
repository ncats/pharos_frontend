import {Component, OnInit} from '@angular/core';
import {Node} from "../../../../../../../../tools/force-directed-graph/fdg-core/graph-component/models/node";
import {Link} from "../../../../../../../../tools/force-directed-graph/fdg-core/graph-component/models/link";
import {PharosNodeService} from "../../pharos-node.service";
import {LinkService} from "../../../../../../../../tools/force-directed-graph/fdg-core/graph-component/services/event-tracking/link.service";
import {PharosD3Service} from "../../pharos-d3.service";
import {GraphDataService} from "../../../../../../../../tools/force-directed-graph/fdg-core/graph-component/services/graph-data.service";


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
              // todo these shouldn't be here
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
