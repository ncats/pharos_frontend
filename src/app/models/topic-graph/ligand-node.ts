/**
 * target that extends node object
 */
import {NodeSerializer, SGNode} from "smrtgraph-core";

export class LigandNode extends SGNode {
  kind = 'ligand';
  Data_Source: string;
  IDG_Ligand: string;
  IDG_Confidence?: number;
  IDG_Evidence?: string;
  // todo: fix api to remove hyphen
//  'IDG_Z-score'?: number;
  // ligand: Ligand;
}
/**
 * serializer to generate a ligand node for a force-directed graph
 */
export class LigandNodeSerializer implements NodeSerializer {
  /**
   * generate node from json
   * @param obj
   * @param {string} id
   * @return {LigandNode}
   */
  fromJson (obj: any, id?: string): LigandNode {
    console.log(obj);
    const node = new LigandNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    // node.ligand = new LigandSerializer().fromJson(node);
    //  node.targets = [];
    console.log(node);
    return node;
  }
  /**
   * flatten node to json.
   * probably never used, but comes with the serializer interface
   */
  toJson() {}
  /**
   * append auxiliary data to a node
   * @param {LigandNode} node
   * @param data
   * @return {LigandNode}
   */
  mergeNodes(node: LigandNode, data: any): LigandNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}
