/**
 * interface with various chart point properties
 */
export interface ScatterPoint {
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
}
