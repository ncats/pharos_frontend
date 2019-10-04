
import {NodeSerializer, SGNode} from 'smrtgraph-core';

/**
 * disease node that extends node object
 * todo: need to clean up these labels from the API
 */
export class DiseaseNode extends SGNode {
  /**
   * node type
   */
  kind = 'disease';

  /**
   * data source string
   */
 'Data_Source': string;

  /**
   * disease name
   */
  'IDG_Disease': string;

  /**
   * optional confidence value
   */
  'IDG_Confidence'?: number;

  /**
   * optgional confidence type
   */
  'IDG_Evidence'?: string;

  /**
   * default display color
   */
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
