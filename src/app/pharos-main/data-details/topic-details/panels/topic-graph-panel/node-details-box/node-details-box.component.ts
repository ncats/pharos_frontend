import {Component, Input, OnInit} from '@angular/core';
import {TargetNode} from '../models/topic-graph/target-node';
import {DiseaseNode} from '../models/topic-graph/disease-node';
import {LigandNode} from '../models/topic-graph/ligand-node';
import {SGLink} from 'smrtgraph-core';


@Component({
  selector: 'app-node-details-box',
  templateUrl: './node-details-box.component.html',
  styleUrls: ['./node-details-box.component.scss']
})
export class NodeDetailsBoxComponent implements OnInit {

  @Input() node: TargetNode | DiseaseNode | LigandNode;
  @Input() link: SGLink;

  constructor(
/*    private nodeService: NodeService,
    private linkService: LinkService,
    private d3Service: D3Service,
    private graphDataService: GraphDataService*/
  ) { }

  ngOnInit() {
    console.log(this);
/*    this.nodeService.nodeList$.subscribe(res => {
      this.node = res.hovered[0]
    });
    this.linkService.linkslist$.subscribe(res => this.link = res.hovered[0]);*/
  }

  /*getLabel(value: number): string {
    if(!value || value === -100){
      return 'no data'
    } else {
      return value.toExponential(2);
    }
  }*/

  foundNode(event) {
    console.log(event);
   /* this.d3Service._clearNodes();
    this.nodeService.hoveredNode([event]);
    this.d3Service._manualClick(event, this.graphDataService.returnGraph());*/
  }

 /* getNodeType(node:Node): string {
    return this.node._type;
  }*/

}
