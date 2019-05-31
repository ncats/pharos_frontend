import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';

/**
 * component to display a donut chart visualization
 */
@Component({
  selector: 'pharos-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements OnInit, OnChanges {

  /**
   * donut chart component holder
   */
  @ViewChild('donutChartTarget', {static: true}) chartContainer: ElementRef;

  /**
   * data to display
   * @type {any[]}
   */
  @Input() data: any[] = [];

  /**
   * margin of space around the donut chart
   * @type {{top: number; bottom: number; left: number; right: number}}
   */
  private margin: any = {top: 10, bottom: 10, left: 10, right: 10};

  /**
   * height of component
   */
  height: number;

  /**
   * width of component
   */
  width: number;

  /**
   * radius of donut chart
   */
  radius: number;

  /**
   * output event on slice click
   * @type {EventEmitter<any>}
   */
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();

  /**
   * listener to resize the chart on page resize
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
    this.updateChart();
  }
  /**
   * no args constructor
   */
  constructor() {}

  /**
   * measure and layou the chart component
   */
  ngOnInit() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    this.drawChart();
    this.updateChart();
  }

  /**
   * update chart on data changes
   * todo: turn this into a subscription or getter/setter like other visualizations
   * @param changes
   */
  ngOnChanges(changes) {
    if (!changes.data.firstChange) {
      this.drawChart();
      this.updateChart();
    }
  }

  /**
   * draw chart svg and labels
   */
  drawChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    const svg = d3.select(element).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom * 2)
      .append('g')
      .attr('class', 'donut-container');
    svg.append('g')
      .attr('class', 'slices');
    svg.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  /**
   * update chart as data changes
   */
  updateChart(): void {
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

    const color = d3.scaleOrdinal(['#b07c47',
      '#c47f2d',
      '#c1ba47',
      '#b2ae6e',
      '#9ba081',
      '#78ad4c',
      '#62bc7a',
      '#57c5ae',
      '#7ea4a7',
      '#5fa2cb'].reverse());


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

    const firstSlice = d3.select('.slices').selectAll('path.slice').data()[0];
    // .data(pie(this.data), 0);

    this.addTooltip(div, firstSlice, color);
  }

  /**
   * add tooltip as donut chart center fill
   * @param element
   * @param d
   * @param color
   */
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
      .html(d.data.count);
    element.transition()
      .duration(200)
      .style('opacity', .9);

  }
}

