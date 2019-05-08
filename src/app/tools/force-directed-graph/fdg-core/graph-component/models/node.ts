import * as d3 from 'd3';

/*const COLOR = d3.scaleSequential(
  d3.interpolateViridis
);*/
const COLOR = d3.scaleDiverging(d3.interpolateViridis).domain([-60, 0, 100]);


/*const COLOR = d3.scaleOrdinal(
 // d3.interpolateRainbow
  ["#379982",
  "#914dd1",
  "#799e27",
  "#b34c95",
  "#4f8b44",
  "#6a71ba",
  "#d56721",
  "#bc4b62",
  "#917136",
  "#c24e3a"]
).domain([-100, 100]);*/

/**
 * serializer interface for nodes
 */
export interface NodeSerializer {

  /**
   * create node from json
   * @param obj
   * @return {Node}
   */
  fromJson(obj: any): Node;

  /**
   * return node as flat json
   * @param {Node} node
   * @return {any}
   */
  toJson(node: Node): any;

  /**
   * merge node data
   * @param {Node} node
   * @param data
   * @return {Node}
   */
  mergeNodes(node: Node, data: any): Node;
}


/**
 * node object for d3 graph
 */
export class Node implements d3.SimulationNodeDatum {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  /**
   * node index
   */
  index?: number;
  /**
   * x axis value
   * @type {number}
   */
  x = 0;
  /**
   * y axis value
   * @type {number}
   */
  y = 0;
  /**
   * x axis velocity
   * @type {number}
   */
  vx = 0;
  /**
   * y axis velocity
   * @type {number}
   */
  vy = 0;
  /**
   * x axis function
   */
  fx?: number | null;
  /**
   * y axis function
   */
  fy?: number | null;
  /**
   * number of links to each node
   * @type {number}
   */
  linkCount = 1;

  /**
   * id string
   */
  uuid: string;
  /**
   * id string
   */
  id: string;
  /**
   * array of node labels
   */
  labels?: string[];
  /**
   * node name
   */
  name: string;
  /**
   * node type
   */
  type: string;
  /**
   * pharos link for more details
   */
  uri: string;

  /**
   * returns baseline proportional size number
   * @return {number}
   */
  normal = () => {
    return Math.sqrt(this.linkCount / 50);
  };

  /**
   * return node radius size based on link count
   * @return {number}
   */
  get r(): number {
    return 50 * this.normal() + 15;
  }
}
