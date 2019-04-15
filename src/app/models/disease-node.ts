import {Node, NodeSerializer} from "../tools/force-directed-graph/force-directed-graph/graph-component/models/node";
import {Disease, DiseaseSerializer} from "./disease";
import {Target} from "./target";

export class DiseaseNodeSerializer implements NodeSerializer {
  fromJson (obj: any, id?: string): DiseaseNode {
    const node = new DiseaseNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    node.disease = new DiseaseSerializer().fromJson(node);
    node.targets = [];
    return node;
  }

  toJson(){}

  mergeNodes(node: DiseaseNode, data: any): DiseaseNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}

/**
 * target that extends node object
 */
export class DiseaseNode extends Node {
  kind = 'disease';
  Data_Source: string;
  IDG_Disease: string;
  IDG_Confidence?: number;
  IDG_Evidence?: string;
  "IDG_Z-score"?: number;
  disease: Disease;
  targets: Target[];
}
