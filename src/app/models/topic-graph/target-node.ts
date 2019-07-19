
/**
 * target that extends node object
 */
import {NodeSerializer, SGNode} from "smrtgraph-core";

export class TargetNode extends SGNode {
  kind = 'target';
  accession: string;
  family: string;
  gene: string;
  name: string;
  tdl: string;
}
/**
 * serializer to generate a target node for a force-directed graph
 */
export class TargetNodeSerializer implements NodeSerializer {
  /**
   * generate node from json
   * @param obj
   * @param {string} id
   * @return {TargetNode}
   */
  fromJson (obj: any, id?: string): TargetNode {
    console.log(obj);
    const node = new TargetNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    // node.target = new TargetSerializer().fromJson(node);
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
   * @param {TargetNode} node
   * @param data
   * @return {TargetNode}
   */
  mergeNodes(node: TargetNode, data: any): TargetNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}
