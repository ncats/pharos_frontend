import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {
  Node,
  NodeSerializer
} from '../../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/models/node';
import {NodeInterface} from "../../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/services/event-tracking/node-interface";
import {TargetNode, TargetNodeSerializer} from "../../../../../../../models/target-node";
import {DiseaseNode, DiseaseNodeSerializer} from "../../../../../../../models/disease-node";
import {LigandNode, LigandNodeSerializer} from "../../../../../../../models/ligand-node";
import {NodeMappingInterface} from "../../../../../../../tools/force-directed-graph/interfaces/node-mapping-interface";

@Injectable({
  providedIn: 'root'
})
export class TargetNodeMappingService implements NodeMappingInterface<TargetNode> {

  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, TargetNode> = new Map<string, TargetNode>();

  targetSerializer: TargetNodeSerializer = new TargetNodeSerializer();

  /**
   * returns all created nodes as a map
   * @return {Map<string, TargetNode>}
   */
  getNodes(): Map<string, TargetNode> {
    return this.masterNodeMap;
  }

  /**
   * fetch node in map
   * @param id
   * @return {TargetNode}
   */
  getById(id): TargetNode {
    return this.masterNodeMap.get(id);
  }

  /**
   * set node in map
   * @param {TargetNode} node
   */
  setNode(node: TargetNode): void {
    this.masterNodeMap.set(node.id, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {TargetNode}
   */
  makeNode(id: string, data: any): TargetNode {
        let n: TargetNode = this.masterNodeMap.get(id.toString());
        if (!n) {
          n = this.targetSerializer.fromJson(data);
        } else {
          n = this.targetSerializer.mergeNodes(n, data);
        }
        return n;
  }

  empty() {
    this.masterNodeMap.clear();
  }




}
