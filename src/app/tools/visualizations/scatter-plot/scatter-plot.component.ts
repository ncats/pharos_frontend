import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3v7';
import {ScatterOptions} from './models/scatter-options';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {PharosPoint} from '../../../models/pharos-point';

@Component({
  selector: 'pharos-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScatterPlotComponent implements OnInit, OnDestroy {

  @ViewChild('scatterPlotDiv', {static: true}) chartContainer: ElementRef;
  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _data = new BehaviorSubject<any>({});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
    if (value.data) {
      this._data.next(value.data);
    } else {
      this._data.next(value);
    }
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  /**
   * options opbject passed from component
   */
  @Input() options?: ScatterOptions;
  /**
   * options for size and layout for the chart
   */
  private _chartOptions: ScatterOptions;

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  @Input()
  filters: string[];

  @Input()
  dataSets: ScatterPlotData[] = [];

  @Input()
  svgID = 'scatter-plot-svg';

  displayData: any[];
  transform: any;
  delaunay: any;
  svg: any;
  zoom: any;
  private tooltip: any;
  private baseRadius = 2.5;
  private hoverRadius = 6;
  line: any;

  /**
   * x axis scale
   */
  private x;

  /**
   * y axis scale
   */
  private y;

  /**
   * width of the graph retrieved from the container size
   */
  width: number;

  /**
   * height of the graph retrieved from the container size
   */
  private height: number;

  constructor(private changeRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformID: any) {
  }


  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.filters) {
          this.filters.forEach(filter => {
            this.displayData.push(this.data.get(filter));
          });
        } else if (this.dataSets.length > 0) {
          const dataSet = this.dataSets.find(dS => dS.selected);
          this.displayData = [dataSet.data];
        } else {
          this.displayData = [this.data];
        }
        if (isPlatformBrowser(this.platformID)) {
          this.drawChart();
        }
      });
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

  drawChart() {
    this.setOptions();
    const element = this.chartContainer.nativeElement;
    const margin = this._chartOptions.margin;
    if (!this.width) {
      this.width = element.offsetWidth - margin.left - margin.right;
    }
    if (!this.height) {
      this.height = element.offsetHeight - margin.top - margin.bottom;
    }

    d3.select(element).selectAll('svg').remove();

    this.svg = d3.select(element)
      .append('svg:svg')
      .attr('id', this.svgID)
      .attr('viewBox', [-margin.left, -margin.top, this.width + margin.left + margin.right, this.height + margin.top + margin.bottom])
      .style('cursor', 'crosshair');
    this.svg.selectAll('g').remove();

    this.setXandY();
    const {xAxis, gX} = this.addXaxis(margin);
    const {yAxis, gY} = this.addYaxis(margin);

    this.delaunay = d3.Delaunay.from(d3.merge(this.displayData), d => this.x(d.x), d => this.y(d.y));

    const mainG = this.svg.append('g').attr('clip-path', `url(#clip-${this.svgID})`);
    const chartArea = mainG.append('g');

    this.addTooltip();

    const clipPath = this.svg
      .append('clipPath')
      .attr('id', `clip-${this.svgID}`)
      .append('rect')
      .attr('x', 0)
      .attr('width', this.width)
      .attr('y', 0)
      .attr('height', this.height);

    const points = chartArea
      .selectAll('circle')
      .data(d3.merge(this.displayData))
      .join('circle')
      .attr('class', d => d.id)
      .attr('data', d => d)
      .attr('cx', d => this.x(d.x))
      .attr('cy', d => this.y(d.y));

    let line;
    if (this._chartOptions.line) {
      line = chartArea.append('path')
        .datum(d3.merge(this.displayData))
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke', '#23364e')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('d', d3.line()
          .x((d) => this.x(d.x))
          .y((d) => this.y(d.y))
        );
    }

    this.zoom = d3.zoom()
      .scaleExtent([0.75, 1000])
      .translateExtent([[-100000, -100000], [100000, 100000]])
      .on('zoom', e => {
        chartArea.attr('transform', (this.transform = e.transform));
        points.attr('r', this.baseRadius / (this.transform.k));
        if (this._chartOptions.line) {
          line.style('stroke-width', 2 / (this.transform.k));
        }
        const xt = this.transform.rescaleX(this.x);
        const yt = this.transform.rescaleY(this.y);
        gX.call(xAxis.scale(xt));
        gY.call(yAxis.scale(yt));
        this.delaunay = d3.Delaunay.from(d3.merge(this.displayData), d => this.x(d.x), d => this.y(d.y));
    });

    this.svg
      .call(this.zoom)
      .call(this.zoom.transform, d3.zoomIdentity)
      .on('pointermove', event => {
        const p = this.transform.invert(d3.pointer(event));
        const {datum, idx, show} = this.find(p);
        if (show) {
          this.highlightPoints(datum);
          this.showTooltip(event, datum);
        } else {
          this.unHighlightPoints();
          this.hideTooltip();
        }
      })
      .node();
  }


  private addTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
    }
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'line-tooltip')
      .style('opacity', 1);

    if (this._chartOptions.xAxisScale === 'year') {
      d3.merge(this.displayData).map(d => {
        if (typeof d.x !== 'object') {
          d.x = new Date(d.x, 0);
        }
        return d;
      });
    }
  }

  addYaxis(margin) {
    const yAxis = d3.axisLeft(this.y)
      .ticks(5)
      .tickSize(-this.width)
      .tickPadding(0);

    // Add the Y Axis
    const gY = this.svg.append('svg:g')
      .attr('class', 'axis yaxis')
      .call(yAxis);

    this.svg.append('text')
      .attr('transform',
        `rotate(-90)`)
      .attr('y', 0 - margin.left / 1.5)
      .attr('x', 0 - (this.height / 2))
      .attr('class', 'axis-label')
      .text(this._chartOptions.yLabel);

    gY.append('line')
      .attr('class', 'axisLine')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', this.height);

    return {yAxis, gY};
  }

  addXaxis(margin) {
    let xAxis;

    if (this._chartOptions.xAxisScale === 'year') {
      xAxis = d3.axisBottom(this.x)
        .ticks(d3.timeYear.every(this.displayData[0].length < 10 ? 1 : 5))
        .tickSize(-this.height)
        .tickPadding(10).tickFormat(d3.timeFormat('%Y'));
    } else {
      xAxis = d3.axisBottom(this.x)
        .ticks((this.width + 2) / (this.height + 2) * 2.5)
        .tickSize(-this.height)
        .tickPadding(10);
    }

    // Add the X Axis
    const gX = this.svg.append('svg:g')
      .attr('class', 'axis xaxis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    gX.append('line')
      .attr('class', 'axisLine')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', this.width)
      .attr('y2', 0);

    this.svg.append('text')
      .attr('transform',
        'translate(' + (this.width / 2) + ' ,' + (this.height + margin.bottom - 5) + ')')
      .attr('class', 'axis-label')
      .text(this._chartOptions.xLabel);

    return {xAxis, gX};
  }

  /**
   * reset zoom and pan
   */
  reset() {
    this.svg.call(this.zoom)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  changeDataSet(event){
    this.dataSets.forEach(dataset => {
      if (dataset.options.yLabel === event.value){
        dataset.selected = true;
      }
      else {
        dataset.selected = false;
      }
    });
    const dS = this.dataSets.find(dataSet => dataSet.selected);
    this.displayData = [dS.data];
    this.drawChart();
  }

  setOptions() {
    if (this.dataSets.length > 0) {
      const dataSet = this.dataSets.find(dS => dS.selected);
      this._chartOptions = dataSet.options;
      return;
    }
    this._chartOptions = this.options ? this.options : new ScatterOptions({});
  }

  private setXandY() {
    this.x = this.getScale(this._chartOptions.xAxisScale, 'x');
    this.y = this.getScale(this._chartOptions.yAxisScale, 'y');

    if (this._chartOptions.xAxisScale === 'year') {
      this.x.domain(
        d3.extent(d3.merge(this.displayData).map(d => {
          if (d.x instanceof Date) {
            return d.x;
          }
          return new Date(+d.x, 0);
        })));
    } else {
      this.x.domain(
        (d3.extent(d3.merge(this.displayData).map(d => d.x)))
      ).nice();
    }

    if (this._chartOptions.yAxisScale === 'year') {
      this.y.domain(
        d3.extent(d3.merge(this.displayData).map(d => {
          if (d.y instanceof Date) {
            return d.y;
          }
          return new Date(d.y, 0);
        })));
    } else {
      const yDomain = d3.extent(d3.merge(this.displayData).map(d => d.y));
      if (this._chartOptions.yBuffer) {
        yDomain[0] -= this._chartOptions.yBuffer;
        yDomain[1] += this._chartOptions.yBuffer;
      }
      this.y.domain(yDomain).nice();
    }
  }


  showTooltip(event: any, data: any): void {
    if (!data) {
      return;
    }
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
      .style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
      .style('width', 100);
  }

  hideTooltip(){
    this.tooltip
      .transition()
      .duration(100)
      .style('opacity', 0);
  }

  highlightPoints(data: any){
    this.unHighlightPoints();
    this.svg.selectAll(`.${data.id}`)
      .attr('r', this.hoverRadius / this.transform.k)
      .exit();
  }

  unHighlightPoints() {
    this.svg
      .selectAll('circle')
      .attr('r', this.baseRadius / this.transform.k)
      .exit();
  }

  find(point) {
    const distance = (pointX, pointY, mouseX, mouseY) => {
      const a = pointX - mouseX;
      const b = pointY - mouseY;
      return Math.sqrt(a * a + b * b);
    };

    const idx = this.delaunay.find(...point);

    if (idx !== null) {
      const datum = this.displayData[0][idx];
      const d = distance(this.x(datum.x), this.y(datum.y), point[0], point[1]);

      return {datum, idx, show: (d < 30)};
    }

    return {datum: null, idx: null, show: false};
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    const element = this.chartContainer.nativeElement;
    if (isPlatformBrowser(this.platformID)) {
      d3.select(element).selectAll('this.svg').remove();
      this.tooltip.remove();
      d3.select('body').selectAll('.line-tooltip').remove();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

export class ScatterPlotData {
  selected = false;
  data: PharosPoint[] = [];
  options: ScatterOptions;
}
