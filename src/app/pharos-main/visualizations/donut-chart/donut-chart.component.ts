import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild,
  ViewEncapsulation
} from "@angular/core";
import * as d3 from 'd3';

@Component({
  selector: 'pharos-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements OnInit {
  @ViewChild('donutChartTarget') chartContainer: ElementRef;
  @Input() data: any[] = [];
  private margin: any = {top: 20, bottom: 20, left: 10, right: 10};
  height: number;
  width: number;
  radius: number;
  donut: any;
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

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
  ngOnChanges(changes){
    if(!changes.data.firstChange) {
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
      .attr('class', 'donut-container');
    svg.append('g')
      .attr('class', 'slices');
    svg.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  updateGraph(): void {
    d3.selectAll('.toolCircle').remove();
    const pie = d3.pie()
      .sort(function (a, b) {
        return a.count - b.count;
      })
      .value(function (d) {
        return d.count;
      });

    const arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius * 0.7)
      .cornerRadius(3)
      .padAngle(.015);

    // this arc is used for aligning the text labels
    const outerArc = d3.arc()
      .outerRadius(this.radius * 0.9)
      .innerRadius(this.radius * 0.9);

    const key = (d => d.data.label);

    const color = d3.scaleOrdinal(d3.schemeCategory20c);


// Define the div for the tooltip
    const div = d3.select('.donut-container').append('g')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    /* ------- PIE SLICES -------*/

    const slice = d3.select('.slices').selectAll('path.slice')
      .data(pie(this.data), key);

  slice.enter()
      .insert('path')
      .style('fill', function (d) {
        return color(d.data.label);
      })
      .attr('class', 'slice')
      .attr('d', arc)

    .on('mouseover', (d) => {
      d3.selectAll('.toolCircle').remove();
      this.addTooltip(div, d, color);
      })
    .on('mouseout', function (d) {
      /*  div.transition()
          .duration(500)
          .style('opacity', 0);*/
      })
    .on('click', (d) => {
        this.clickSlice.emit(d.data);
      });

    slice.exit()
      .remove();
  }

  addTooltip(element: any, d: any, color: any): void {
    element.append('circle')
      .attr('class', 'toolCircle')
      .attr('r', this.radius * 0.65) // radius of tooltip circle
      .style('fill', color(d.data.label)) // colour based on category mouse is over
      .style('fill-opacity', 0.35);
    element.append('text')
      .attr('class', 'toolCircle')
      .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.data.label); // add text to the circle.
       element.append('text')
      .attr('class', 'toolCircle count')
      .attr('dy', 30) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.data.count)
    element.transition()
      .duration(200)
      .style('opacity', .9);

  }
}

