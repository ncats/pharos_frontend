import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pharos-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent  implements OnInit, OnChanges {
  @ViewChild('donutChartTarget') chartContainer: ElementRef;
  @Input() data: any[] = [];
  private margin: any = {top: 20, bottom: 20, left: 10, right: 10};
  height: number;
  width: number;
  radius: number;
  donut: any;
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  // todo add click event that emits up
  // todo - data change doesnt update the chart, it just redraws it;
  // todo - revamp this to be more in line with es6
  ngOnInit() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    this.drawGraph();
    this.updateGraph();
  }

  ngOnChanges(changes) {
    if (!changes.data.firstChange) {
      this.updateGraph();
    }
  }

  drawGraph(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    const svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'line-container');
    svg.append('g')
      .attr('class', 'slices');
    svg.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    // Add the X Axis
    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.height + ')');

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(20,0)');

    // Add the valueline path.
    svg.append('path')
      .attr('class', 'timeline')
      .attr('transform', 'translate(' + this.margin.left + ',0)' );

    d3.select(element).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

  }

  updateGraph(): void {
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.globalCounts)])
      .range([this.height, 0]);

    // Compute an ordinal xScale for the keys in boxPlotData
    const xScale = d3.scalePoint()
      .domain(Object.keys(this.groupCounts))
      .rangeRound([0, this.width])
      .padding([0.5]);

    // create dose response line
    const valueline = d3.line()
      .x((d) => xScale(d.index))
      .y((d) => yScale(d.value));

    d3.select('.drcurve')   // change the line
      .attr('d', valueline(this.data))
      .attr('stroke', '#265668')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }
}



