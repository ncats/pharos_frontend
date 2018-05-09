import * as d3 from 'd3';
import {Node} from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  //  must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  properties?: any;
  uuid: string;
  type: string;
  qualifier: string;

  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    this.type = data.type || '';
    this.properties = data.properties;
    this.uuid = data.identity.low;
    this.qualifier = data.properties.qualifier;
  }
}
