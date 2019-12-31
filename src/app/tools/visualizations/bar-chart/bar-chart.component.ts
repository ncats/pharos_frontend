import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import {PharosPoint} from '../../../models/pharos-point';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

/**
 * component to create a d3 bar chart
 */
@Component({
  selector: 'pharos-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnDestroy {

  /**
   * element container
   */
  @ViewChild('barChartTarget', {static: true}) chartContainer: ElementRef;

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
  set data(value: any[]) {
      this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  /**
   * margin for padding
   * todo should probabl still use the chart options config object
   */
  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};

  /**
   * height of container
   */
  height: number;

  /**
   * width of container
   */
  width: number;

  /**
   * generated graph svg
   */
  svg: any;

  /**
   * tooltip object shown on hover over
   */
  tooltip: any;

  /**
   * event emitter on section click
   * todo currently unused, but still needed
   * @type {EventEmitter<any>}
   */
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();


  /**
   * function to redraw/scale the graph on window resize
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawGraph();
    this.updateGraph();
  }

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * draw basic graph elements, and once data is available, update graph with data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.drawGraph();
        if (this.data) {
          this.updateGraph();
        }
      });
  }

  /**
   * draw the very basic graph elements, axes, etc
   */
  drawGraph(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    d3.select(element).selectAll('svg').remove();

    this.svg = d3.select(element)
      .append('svg:svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetWidth)
      .append('svg:g')
      .attr('id', 'group')
      .attr('class', 'bar-container')
      .attr('transform', `translate(${this.margin.right}, 0)`);

    // Add the X Axis
    this.svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(20,' + this.height + ')');

    // Add the Y Axis
    this.svg.append('g')
      .attr('class', 'yaxis')
      .attr('transform', `translate(${this.margin.left}, 0)`);

    this.svg.append('g')
      .attr('class', 'bar-holder');

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'bar-tooltip')
      .style('opacity', 0);
  }

  /**
   * update dynamic data elements as it is updated, This allows the data to change without having to redraw
   * the entire chart
   */
  updateGraph(): void {
    // todo: multiplying the width was a cheap fix - the div width is not computed correctly because of the sidenav
    const x = d3.scaleBand()
      .rangeRound([0, this.width * .75], .1)
      .paddingInner(0.1);

    const y = d3.scaleLinear()
      .range([this.height, 0]);

    const xAxis = d3.axisBottom()
      .scale(x);

    const yAxis = d3.axisLeft()
      .scale(y);

    x.domain(this.data.map( d =>  d[0]));
    y.domain([0, d3.max(this.data, d => +d[1])]);

    const xaxis = this.svg.select('.xaxis')
      .call(xAxis);

    this.svg.select('.yaxis')
      .call(yAxis);

    this.svg.select('.bar-holder').selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x',  d => x(d[0]))
      .attr('width', x.bandwidth())
      .attr('y',  d => y(+d[1]))
      .attr('height', d => this.height - y(+d[1]))
      .attr('transform', 'translate(20, 0)')
      .style('pointer-events', 'all')
      .on('mouseover', (d, i, bars) => {
        d3.select(bars[i]).classed('hovered', true);
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', .9);
        this.tooltip.html('<span>' + d[0] + ': <br>' + d[1] + '</span>')
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px')
          .style('width', 100);
      })
      .on('mouseout', (d, i, bars) => {
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0);
        d3.select(bars[i]).classed('hovered', false);
      });
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
