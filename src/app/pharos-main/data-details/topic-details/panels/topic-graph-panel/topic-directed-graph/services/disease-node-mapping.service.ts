import { Injectable } from '@angular/core';
import {NodeMappingInterface} from '../../../../../../../tools/force-directed-graph/interfaces/node-mapping-interface';
import {DiseaseNode, DiseaseNodeSerializer} from '../../../../../../../models/disease-node';

@Injectable({
  providedIn: 'root'
})
export class DiseaseNodeMappingService implements NodeMappingInterface<DiseaseNode> {

  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, DiseaseNode> = new Map<string, DiseaseNode>();

  diseaseSerializer: DiseaseNodeSerializer = new DiseaseNodeSerializer();

  /**
   * returns all created nodes as a map
   * @return {Map<string, DiseaseNode>}
   */
  getNodes(): Map<string, DiseaseNode> {
    return this.masterNodeMap;
  }

  /**
   * fetch node in map
   * @param id
   * @return {DiseaseNode}
   */
  getById(id): DiseaseNode {
    return this.masterNodeMap.get(id);
  }

  /**
   * set node in map
   * @param {DiseaseNode} node
   */
  setNode(node: DiseaseNode): void {
    this.masterNodeMap.set(node.id, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {DiseaseNode}
   */
  makeNode(id: string, data: any): DiseaseNode {
    let n: DiseaseNode = this.masterNodeMap.get(id.toString());
    if (!n) {
      n = this.diseaseSerializer.fromJson(data);
    } else {
      n = this.diseaseSerializer.mergeNodes(n, data);
    }
    return n;
  }

  empty() {
    this.masterNodeMap.clear();
  }




}
