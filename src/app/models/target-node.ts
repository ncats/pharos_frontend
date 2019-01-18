import {Node, NodeSerializer} from "../tools/force-directed-graph/force-directed-graph/graph-component/models/node";

export class TargetNodeSerializer implements NodeSerializer {
  fromJson (obj: any, id?: string): TargetNode {
    const node = new TargetNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    node.linkCount = node.diseaseCount + node.ligandCount || 1;
    return node;
  }

  toJson(){}
}

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
   * protein dark level
   */
  tdl: string;
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

  ligandCount: number;
  diseaseCount: number;
  type = 'target';
}
