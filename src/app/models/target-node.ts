import {Node, NodeSerializer} from "../tools/force-directed-graph/force-directed-graph/graph-component/models/node";

export class TargetNodeSerializer implements NodeSerializer {
  fromJson (obj: any, id?: string): TargetNode {
    const node = new TargetNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    node.linkCount = node.diseaseCount + node.ligandCount || 1;
    node.idgTDL = obj.tdl;
    node.idgFamily = obj.family;
    return node;
  }

  toJson(){}

  mergeNodes(node: TargetNode, data: any): TargetNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
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
  idgFamily: string;
  /**
   * protein dark level
   */
  tdl: string;
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

  ligandCount: number;
  diseaseCount: number;
  type = 'target';
}
