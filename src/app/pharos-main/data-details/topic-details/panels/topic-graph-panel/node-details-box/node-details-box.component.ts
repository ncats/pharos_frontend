import {Component, Input} from '@angular/core';
import {TargetNode} from '../models/topic-graph/target-node';
import {DiseaseNode} from '../models/topic-graph/disease-node';
import {LigandNode} from '../models/topic-graph/ligand-node';
import {SGLink} from 'smrtgraph-core';

/**
 * component to display node properties on hover
 */
@Component({
  selector: 'app-node-details-box',
  templateUrl: './node-details-box.component.html',
  styleUrls: ['./node-details-box.component.scss']
})
export class NodeDetailsBoxComponent {

  /**
   * node that is passed in by the parent component
   */
  @Input() node: TargetNode | DiseaseNode | LigandNode;

  /**
   * link passed in by parent component
   */
  @Input() link: SGLink;

  /**
   * no args
   */
  constructor() {
  }
}
