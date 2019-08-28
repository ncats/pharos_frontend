
import {NodeSerializer, SGNode} from 'smrtgraph-core';
/**
 * ligand node that extends node object
 */
export class LigandNode extends SGNode {
  /**
   * node type
   */
  kind = 'ligand';
  /**
   * data source string
   */
  Data_Source: string;

  /**
   * ligand name
   */
  IDG_Ligand: string;
  /**
   * ligand confidence value
   */
  IDG_Confidence?: number;

  /**
   * ligandevidence type
   */
  IDG_Evidence?: string;
  // todo: fix api to remove hyphen
//  'IDG_Z-score'?: number;
  // ligand: Ligand;

  /**
   * internal link for ligand
   */
  internalLink: string[];
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
    const node = new LigandNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    node.internalLink = ['/ligands', obj.id];

    // node.ligand = new LigandSerializer().fromJson(node);
    //  node.targets = [];
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
