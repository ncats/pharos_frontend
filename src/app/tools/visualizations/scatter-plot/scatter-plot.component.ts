import {
  ChangeDetectionStrategy,
  Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs/index';
import * as d3 from 'd3';
import {SelectionModel} from '@angular/cdk/collections';
import {ScatterOptions} from './models/scatter-options';
import {ScatterPoint} from './models/scatter-point';
import {PharosPoint} from '../../../models/pharos-point';

/**
 * flexible scatterplot/line chart viewer, has click events, hoverover, and voronoi plots for easier hoverover
 */
@Component({
  selector: 'pharos-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterPlotComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * container that holds the radar chart object
   */
  @ViewChild('scatterPlotTarget', {static: true}) chartContainer: ElementRef;

  @Input() data: any;

  /**
   * options opbject passed from component
   */
  @Input() options?: any;
  /**
   * options for size and layout for the chart
   */
  private _chartOptions: ScatterOptions;

  /**
   * svg object that is drawn, also used to clear the chart on redraw
   */
  private svg: any;

  /**
   * html element that will hold tooltip data
   */
  private tooltip: any;

  /**
   * width of the graph retrieved from the container size
   */
  private width: number;

  /**
   * height of the graph retrieved from the container size
   */
  private height: number;

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  @Input()
  filters: string[];

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * array of data sources, allows for multiple lines/data sets
   * @type {any[]}
   */
  displayData: any = [];

  /**
   * x axis scale
   */
  private x;

  /**
   * y axis scale
   */
  private y;

  /**
   * zoom scale
   * @type {number}
   */
  private k = 1;

  /**
   * svg line element if added
   */
  private line;

  /**
   * svg voronoi elements
   */
  private voronoi;

  /**
   * svg holder of voronoi group
   */
  private voronoiGroup;

  /**
   * svg chart object holder for data points and voronoi
   */
  private chartGroup;

  /**
   * zoom function
   */
  private zoom;

  /**
   * function to redraw/scale the graph on window resize
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
    this.setData();
  }

  /**
   * subscrible to data change, and parse data
   * draw chart object,
   * and update with data
   */
  ngOnInit() {
        if (this.filters) {
          this.filters.forEach(filter => {
            this.displayData.push(this.data.get(filter));
          });
        } else {
          this.displayData = [this.data];
        }
        this.drawChart();
        this.setData();
  }

  /**
   * when data changes re-parse data and update the chart
   * no need to redraw the main components
   * @param change
   */
  ngOnChanges(change) {
    if (this.filters && this.data) {
      if (change.filters) {
        this.displayData = [];
        change.filters.currentValue.forEach(filter => {
          this.displayData.push(this.data.get(filter));
        });
        this.updateData();
      }
    }
  }

  /**
   * retrieve passed in options or create a new standard configuration
   */
  getOptions() {
    // get chart options
    this._chartOptions = this.options ? this.options : new ScatterOptions({});
  }

  /**
   * get scale based on axis and desired type
   * can choose 'log', 'point', 'year' or 'linear'
   * @param {string} type
   * @param {string} axis
   * @returns {any}
   */
  getScale(type: string, axis: string) {
    const range: any[] = [];
    if (axis === 'x') {
      range[0] = 0;
      range[1] = this.width;
    }
    if (axis === 'y') {
      range[0] = this.height;
      range[1] = 0;
    }

    switch (type) {
      case 'log': {
        return d3.scaleLog().range(range);
      }

      case 'point': {
        return d3.scalePoint().range(range);
      }

      case 'year': {
        return d3.scaleTime().rangeRound(range);
      }

      case 'linear': {
        return d3.scaleLinear().rangeRound(range);
      }

      default: {
        return d3.scaleLinear().rangeRound(range);
      }
    }
  }

  /**
   * draw the main chart object
   * draw axes based on type
   * create voronoi group holders
   * add zoom and pan functionality
   */
  drawChart(): void {
    this.getOptions();
    //////////// Create the container SVG and g /////////////
    const element = this.chartContainer.nativeElement;
    const margin = this._chartOptions.margin;
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
    // Remove whatever chart with the same id/class was present before
    d3.select(element).selectAll('svg').remove();

    this.x = this.getScale(this._chartOptions.xAxisScale, 'x');
    this.y = this.getScale(this._chartOptions.yAxisScale, 'y');

    if (this._chartOptions.line) {
      this.line = d3.line()
        .x((d: PharosPoint) => this.x(+d.x))
        .y((d: PharosPoint) => this.y(+d.y));
    }

    this.voronoi = d3.voronoi()
      .x((d: ScatterPoint) => this.x(d.x))
      .y((d: ScatterPoint) => this.y(d.y))
      .extent([[-this._chartOptions.margin.left, -this._chartOptions.margin.top],
        [this.width + this._chartOptions.margin.right, this.height + this._chartOptions.margin.bottom]]);

    if (this._chartOptions.xAxisScale === 'year') {
      this.x.domain(
        d3.extent(d3.merge(this.displayData).map(d =>  new Date(d.x, 0))));
    } else {
      this.x.domain(
        (d3.extent(d3.merge(this.displayData).map(d => d.x)))
      ).nice();
    }

    if (this._chartOptions.yAxisScale === 'year') {
      this.y.domain(
        d3.extent(d3.merge(this.displayData).map(d =>  new Date(d.y, 0))));
    } else {
      this.y.domain(
        (d3.extent(d3.merge(this.displayData).map(d => d.y)))
      ).nice();
    }

    let xAxis = d3.axisBottom(this.x)
      .ticks((this.width + 2) / (this.height + 2) * 5)
      .tickSize(-this.height)
      .tickPadding(10);

    if (this._chartOptions.xAxisScale === 'year') {
     xAxis = d3.axisBottom(this.x).ticks(d3.timeYear.every(3)).tickSize(-this.height)
       .tickPadding(10).tickFormat(d3.timeFormat('%Y'));
    }

    const yAxis = d3.axisRight(this.y)
      .ticks(5)
      .tickSize(this.width)
      .tickPadding(-20 - this.width);



    this.svg = d3.select(element)
      .append('svg:svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom * 2)
      .append('svg:g')
      .attr('id', 'group')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.svg.append('text')
      .attr('transform',
        'translate(' + (this.width / 2) + ' ,' + (this.height + margin.top + 20) + ')')
      .attr('class', 'axis-label')
      .text(this._chartOptions.xLabel);

    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left / 1.4)
      .attr('x', 0 - (this.height / 2))
      .attr('class', 'axis-label')
      .text(this._chartOptions.yLabel);

    // Add the X Axis
    const gX = this.svg.append('svg:g')
      .attr('class', 'axis xaxis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // Add the Y Axis
    const gY = this.svg.append('svg:g')
      .attr('class', 'axis yaxis')
      .call(yAxis);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x).ticks(0));

    this.svg.append('g')
      .call(d3.axisLeft(this.y).ticks(0));

    // Add the valueline path.
    this.svg.append('path')
      .attr('clip-path', 'url(#clip)')
      .attr('class', 'timeline');

    this.chartGroup = this.svg
      .append('svg:g')
      .attr('class', 'chartbody')
      .attr('clip-path', 'url(#clip)')
      .append('svg:g')
      .attr('class', 'points');

    this.voronoiGroup = this.svg
      .append('svg:g')
      .attr('class', 'voronoiParent')
      .attr('clip-path', 'url(#clip)')
      .append('svg:g')
      .attr('class', 'voronoi');

    this.svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);


    this.tooltip = d3.select('body').append('div')
      .attr('class', 'line-tooltip')
      .style('opacity', 0);

    const zoomed = () => {
      const t = d3.event.transform;
      this.k = t.k;

      const xt = t.rescaleX(this.x);
      const yt = t.rescaleY(this.y);
      gX.call(xAxis.scale(xt));
      gY.call(yAxis.scale(yt));


      if (this._chartOptions.line) {
        this.line = d3.line()
          .x((d: PharosPoint) => xt(d.x))
          .y((d: PharosPoint) => yt(d.y));
      }

      this.svg.select('.chartbody').selectAll('.linePoints')
        .attr('r', (3 / this.k))
        .exit();

      // Add the valueline path.
      if (this._chartOptions.line) {
        this.svg.select('.timeline')   // change the line
          .datum(d3.merge(this.displayData), d => d)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke', '#23364e')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr('d', this.line)
          .exit();
      }

      this.voronoiGroup
        .attr('transform', d3.event.transform);
      this.chartGroup
        .attr('transform', d3.event.transform);
    };


    this.zoom = d3.zoom()
      .scaleExtent([0.75, 1000])
      .translateExtent([[-100000, -100000], [100000, 100000]])
      .on('zoom', zoomed);

    this.voronoiGroup.call(this.zoom);
  }

  /**
   * set data in chart, and draw objects as needed
   */
  setData() {
    if (this._chartOptions.xAxisScale === 'year' ) {
      d3.merge(this.displayData).map( d => {
         if (typeof d.x !== 'object') {
           d.x = new Date(d.x, 0);
         }
        return d;
      });
    }

       // JOIN new data with old elements.
    const circles = this.svg.select('.points').selectAll('.linePoints')
      .data(d3.merge(this.displayData), d => d);
    circles.enter()
      .append('circle')
      .attr('class', 'linePoints')
      .attr('r', 2.5 / this.k)
      .attr('id', d => d.id)
      .attr('cy', d => this.y(d.y))
      .attr('cx', d => this.x(d.x))
      .style('fill', d => '#23364e')
      .style('pointer-events', 'all')
      .exit();



    // Add the valueline path.
    if (this._chartOptions.line) {
      this.svg.select('.timeline')   // change the line
        .datum(this.data)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke', '#23364e')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('d', this.line)
        .exit();
    }

    this.setVoronoi();
  }

  /**
   * update chart data and redraw elements as needed
   */
  updateData(): void {
    if (this._chartOptions.xAxisScale === 'year' ) {
     // d3.merge(this.displayData).map( d => d.x = new Date(d.x, 0));
    }

    const t = d3.transition()
      .duration(100);

    const circles = this.svg.select('.points').selectAll('.linePoints')
      .data(d3.merge(this.displayData), d => d);

    // EXIT old elements not present in new data.
    circles
      .exit()
      .transition(t)
      .style('fill-opacity', 1e-6)
      .remove();

    // don't update old elements because we want them to overlap
    // ENTER new elements present in new data.
    circles.enter()
      .append('circle')
      .attr('class', 'linePoints')
      .attr('r', 2.5 / this.k)
      .attr('id', d => d.id)
      .attr('cy', d => this.y(d.y))
      .attr('cx', d =>  this.x(d.x))
      .style('fill', d => '#23364e')
      .style('pointer-events', 'all')
      .transition(t)
      .style('fill-opacity', 1);

    if (this._chartOptions.line) {
      this.svg.select('.timeline')   // change the line
        .datum(this.data)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke', '#23364e')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('d', this.line)
        .exit();
    }

    this.setVoronoi();
  }

  /**
   * draw voronoi elements to ease point hightlighting on hover
   */
  setVoronoi(): void {
    const voronoi = this.svg.select('.voronoi').selectAll('.voronoi-path')
      .data(this.voronoi.polygons(d3.merge(this.displayData)), d => d);

    // EXIT old elements not present in new data.
    voronoi
      .exit()
      .remove();

    // UPDATE old elements present in new data.
    voronoi
      .attr('d', (d) => d ? 'M' + d.join('L') + 'Z' : null);

    // ENTER new elements present in new data.
    voronoi
      .enter()
      .append('path')
      .attr('class', 'voronoi-path')
      // .style('pointer-events', 'all')
      .attr('d', (d) => d ? 'M' + d.join('L') + 'Z' : null)
      .on('mouseover', (d) => this.mouseOn(d.data))
      .on('mouseout', (d) => this.mouseOut(d.data))
      .exit();
  }

  /**
   * mouseover function
   * @param data
   */
  mouseOn(data: any): void {
    this.svg.select(`#${data.id}`)
      .attr('r', 6 / this.k)
      .exit();
    this.tooltip
      .transition()
      .duration(100)
      .style('opacity', .9);
    let span = '';
    const x = this._chartOptions.xAxisScale === 'year' ? data.x.getFullYear() : data.x;
    const y = this._chartOptions.yAxisScale === 'year' ? data.y.getFullYear() : data.y;
    if (data.label) {
      span = `<div class="tooltip">
              <span class="tooltip-label">${data.label}</span>:&nbsp; ${data.name}<br>
              <span class="tooltip-label">${this._chartOptions.xLabel}</span>:&nbsp;${data.x}<br>
              <span class="tooltip-label">${this._chartOptions.yLabel}</span>:&nbsp;${data.y}<br>
              </div>`;
    } else {
      span = '<span>' + x + ': <br>' + y + '</span>';
    }
    this.tooltip.html(span)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
      .style('width', 100);
  }

  /**
   * mouseout function
   * @param data
   */
  mouseOut(data: any) {
    this.tooltip
      .transition()
      .duration(200)
      .style('opacity', 0);
    this.svg.select(`#${data.id}`)
      .attr('r', 2.5 / this.k)
      .exit();
  }

  /**
   * reset zoom and pan
   */
  reset() {
    this.k = 1;
    this.voronoiGroup.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('this.svg').remove();
    d3.select('body').selectAll('.line-tooltip').remove();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
