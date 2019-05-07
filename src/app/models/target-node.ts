import {Node, NodeSerializer} from '../tools/force-directed-graph/fdg-core/graph-component/models/node';
import {Target, TargetSerializer} from './target';

/**
 * target that extends node object
 */
export class TargetNode extends Node {
  /**
   * uniprot id
   */
  accession: string;
  /**
   * protein family
   */
  family: string;

  /**
   * idg family
   */
  idgFamily: string;
  /**
   * protein dark level
   */
  tdl: string;
  /**
   * idg level
   */
  idgTDL: string;
  /**
   * pharos link of protein
   * currently to a different pharos instance
   * todo: sync with current database
   */
  uri: string;
  /**
   * gene name
   */
  gene: string;

  /**
   * number of ligands associated with a target
   */
  ligandCount: number;

  /**
   * number of diseases associated with a target
   */
  diseaseCount: number;

  /**
   * node type
   * @type {string}
   */
  type = 'target';

  /**
   * target object - probably easier than setting all these values
   */
  target: Target;
}

/**
 * serializer for target node operations
 */
export class TargetNodeSerializer implements NodeSerializer {

  /**
   * create target node from json
   */
  fromJson (obj: any, id?: string): TargetNode {
    const node = new TargetNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    node.linkCount = node.diseaseCount + node.ligandCount || 1;
    node.idgTDL = obj.tdl;
    node.idgFamily = obj.family;
    node.target = new TargetSerializer().fromJson(node);
    return node;
  }

  /**
   * flatten node
   */
  toJson() {}

  /**
   * add data to node
   * @param {TargetNode} node
   * @param data
   * @return {TargetNode}
   */
  mergeNodes(node: TargetNode, data: any): TargetNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}

