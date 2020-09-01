import {ScatterPoint} from '../tools/visualizations/scatter-plot/models/scatter-point';

/**
 * extends scatter point object to add name and label properties
 */
export class PharosPoint implements ScatterPoint {

  /**
   * optional point name
   */
  name?: string;

  /**
   * optional point label
   */
  label?: string;

  /**
   * x-axis point value
   */
  x: number;

  /**
   * y-axis point value
   */
  y: number;

  /**
   * used to track hover over
   */
  id: string;

  /**
   * map data to node - create custom id for hovering functionality
   * @param data
   */
  constructor(data: any) {
    Object.entries((data)).forEach((prop) => this[prop[0]] = prop[1]);
    this.id = this.name ? 'pharos-' + data.name.replace(/ /g, '-').toLowerCase() :
      `pharos-${this.x.toFixed(0).toString()}-${this.y.toFixed(0).toString()}`;
    this.id = this.id.replace(/[ \(\),\/\\\[\].']/g, '');
  }
}
