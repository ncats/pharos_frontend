import {Node, NodeSerializer} from '../tools/force-directed-graph/fdg-core/graph-component/models/node';

/**
 * lingand node for display in force directed graph
 */
export class LigandNode extends Node {

  /**
   * node type
   * @type {string}
   */
  type = 'ligand';
  /**
   * data source
   * todo:  - capitalization retained from api, but will change
   */
  Data_Source: string;

  /**
   * source of information for the ligand activity
   */
  Ligand_Activity_Source: string;

  /**
   * lychi l1 value
   */
  LyChI_L1: string;

  /**
   * lychi l2 value
   */
  LyChI_L2: string;

  /**
   * lychi l3 value
   */
  LyChI_L3: string;

  /**
   * lychi l4 value
   */
  LyChI_L4: string;

  /**
   * source of ligand information
   */
  Ligand_Source: string;

  /**
   * ligand activity
   */
  Ligand_Activity: string;

  /**
   * smiles of ligand
   */
  CHEMBL_Canonical_SMILES: string;

  /**
   * url for structure image
   */
  image: string;

  /**
   * ic50 value
   */
  IC50: number;

  /**
   * idg ligand id
   */
  IDG_Ligand: number;
}

/**
 * serializer of ligand operations
 */
export class LigandNodeSerializer implements NodeSerializer {

  /**
   * returns ligand node from json
   * @param obj
   * @param {string} id
   * @return {LigandNode}
   */
  fromJson (obj: any, id?: string): LigandNode {
    const node = new LigandNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }

  /**
   * flatten object
   */
  toJson() {}

  /**
   * append data to a node
   * @param {LigandNode} node
   * @param data
   * @return {LigandNode}
   */
  mergeNodes(node: LigandNode, data: any): LigandNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}

