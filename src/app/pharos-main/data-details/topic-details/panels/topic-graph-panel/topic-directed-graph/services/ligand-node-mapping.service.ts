import { Injectable } from '@angular/core';
import {NodeMappingInterface} from '../../../../../../../tools/force-directed-graph/interfaces/node-mapping-interface';
import {LigandNode, LigandNodeSerializer} from '../../../../../../../models/ligand-node';

@Injectable({
  providedIn: 'root'
})
export class LigandNodeMappingService implements NodeMappingInterface<LigandNode> {

  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, LigandNode> = new Map<string, LigandNode>();

  ligandSerializer: LigandNodeSerializer = new LigandNodeSerializer();

  /**
   * returns all created nodes as a map
   * @return {Map<string, LigandNode>}
   */
  getNodes(): Map<string, LigandNode> {
    return this.masterNodeMap;
  }

  /**
   * fetch node in map
   * @param id
   * @return {LigandNode}
   */
  getById(id): LigandNode {
    return this.masterNodeMap.get(id);
  }

  /**
   * set node in map
   * @param {LigandNode} node
   */
  setNode(node: LigandNode): void {
    this.masterNodeMap.set(node.id, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {LigandNode}
   */
  makeNode(id: string, data: any): LigandNode {
    let n: LigandNode = this.masterNodeMap.get(id.toString());
    if (!n) {
      n = this.ligandSerializer.fromJson(data);
    } else {
      n = this.ligandSerializer.mergeNodes(n, data);
    }
    return n;
  }

  empty() {
    this.masterNodeMap.clear();
  }




}
