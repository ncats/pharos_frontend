import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import {BehaviorSubject} from 'rxjs/index';

export interface PharosPoint {
  name?: string;
  label?: string;
  key: number;
  value: number;
}

@Component({
  selector: 'pharos-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChartTarget') chartContainer: ElementRef;

  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  get data(): any {
    return this._data.value;
  }

  @Input() line = true;

  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  height: number;
  width: number;
  svg: any;
  tooltip: any;
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();

  /**
   * no args constructor
   */
  constructor() {
  }

  ngOnInit() {
    this.drawGraph();
    this._data.subscribe(x => {
      if (this.data) {
         this.updateGraph();
      }
    });
  }

  drawGraph(): void {

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(element)
      .append('svg:svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('svg:g')
      .attr('id', 'group')
      .attr('class', 'bar-container');

    // Add the X Axis
    this.svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(20,' + this.height + ')');

    // Add the Y Axis
    this.svg.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(20, 0)');

    this.svg.append('g')
      .attr('class', 'bar-holder');

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'bar-tooltip')
      .style('opacity', 0);
  }

  updateGraph(): void {
    const x = d3.scaleBand()
      .rangeRound([0, this.width], .1)
      .paddingInner(0.1);

    const y = d3.scaleLinear()
      .range([this.height, 0]);

    const xAxis = d3.axisBottom()
      .scale(x);

    const yAxis = d3.axisLeft()
      .scale(y);

    x.domain(this.data.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(this.data, function(d) { return +d[1]; })]);

    const xaxis = this.svg.select('.xaxis')
      .call(xAxis);

/*    this.svg.selectAll('.xaxis text')  // select all the text elements for the xaxis
      .attr('transform', function(d) {
        return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-45)';
      });*/

    this.svg.select('.yaxis')
      .call(yAxis);

    this.svg.select('.bar-holder').selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d[0]); })
      .attr('width', x.bandwidth())
      .attr('y', function(d) { return y(+d[1]); })
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
}
