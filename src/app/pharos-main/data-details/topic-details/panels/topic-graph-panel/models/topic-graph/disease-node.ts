/**
 * target that extends node object
 */
import {NodeSerializer, SGNode} from "smrtgraph-core";

export class DiseaseNode extends SGNode {
  kind = 'disease';
  Data_Source: string;
  IDG_Disease: string;
  IDG_Confidence?: number;
  IDG_Evidence?: string;
  color = 'green';
  // todo: fix api to remove hyphen
//  'IDG_Z-score'?: number;
 // disease: Disease;
}
/**
 * serializer to generate a disease node for a force-directed graph
 */
export class DiseaseNodeSerializer implements NodeSerializer {
  /**
   * generate node from json
   * @param obj
   * @param {string} id
   * @return {DiseaseNode}
   */
  fromJson (obj: any, id?: string): DiseaseNode {
    const node = new DiseaseNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
   // node.disease = new DiseaseSerializer().fromJson(node);
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
   * @param {DiseaseNode} node
   * @param data
   * @return {DiseaseNode}
   */
  mergeNodes(node: DiseaseNode, data: any): DiseaseNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}
