import * as d3 from 'd3';
import {Node} from './node';

/**
 * d3 link object
 */
export class Link implements d3.SimulationLinkDatum<Node> {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  /**
   * link index number
   */
  index?: number;

  //  must - defining enforced implementation properties
  /**
   * source node can be a node object, id string or id number
   */
  source: Node | string | number;
  /**
   * target node can be a node object, id string or id number
   */
  target: Node | string | number;
  /**
   * properties object
   */
  properties?: any;
  /**
   * id string
   */
  uuid: string;
  /**
   * link type
   */
  type: string;
  /**
   * link qualifier
   */
  qualifier: string;

  /**
   * type of edge - controls arrow direction
   */
  edgeType: string;
  /**
   * create new link
   * @param source
   * @param target
   * @param data
   */
  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    if (data) {
      this.type = data.type || '';
      this.properties = data.properties;
      this.uuid = data.identity ? data.identity.low : 0;
      this.qualifier = data.properties ? data.properties.qualifier : '';
    }
  }

  getSourceId(): string {
    const source = this.source;
    if (typeof source === 'string') {
    return source;
    } else {
      return this.source['uuid'];
    }
  }

  getTargetId() {
    const target = this.target;
    if (typeof target === 'string') {
      return target;
    } else {
      return this.target['uuid'];
    }
  }
}
