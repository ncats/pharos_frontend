export class ScatterOptions {
  /**
   * basic config options for a scatter plot
   */
  /**
   * The margins of the SVG
   */
  margin: any = {top: 30, right: 30, bottom: 60, left: 60};

  /**
   * boolean to switch between line chart and scatterplot
   * @type {boolean}
   */
  line = false;
  /**
   * d3 color scale
   */
  color: any[] = [];
  /**
   * show labels
   * linear is a subdividable line of points
   * log is a logarithmic scale
   * point is undividable points, like years
   */
  xAxisScale: 'linear' | 'year' | 'log' | 'point' = 'linear';
  yAxisScale: 'linear' | 'log' | 'year' | 'point' = 'linear';

  xLabel: string;
  yLabel: string;

  /**
   * merge new option properties with a default option object retrieved from the chart service
   * @param obj
   */
  constructor(obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
