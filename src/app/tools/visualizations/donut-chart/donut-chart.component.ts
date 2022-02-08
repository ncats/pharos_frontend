import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3v7';
import {isPlatformBrowser} from '@angular/common';
import {Observable, pipe, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * component to display a donut chart visualization
 */
@Component({
  selector: 'pharos-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  private eventsSubscription: Subscription;

  @Input() events: Observable<string>;
  @Input() svgID = 'top-level-donut';
  /**
   * donut chart component holder
   */
  @ViewChild('donutChartTarget', {static: false}) chartContainer: ElementRef;

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

  chartArea: any;

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
  @HostListener('window:resize', [])
  onResize() {
    this.redraw();
  }
  /**
   * no args constructor
   */
  constructor(@Inject(PLATFORM_ID) private platformID: any) {}

  /**
   * measure and layou the chart component
   */
  ngAfterViewInit() {
    this.eventsSubscription = this.events
      ?.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((chart) => {
      if (chart === 'donut-chart') {
        this.redraw();
      }
    });
    if (isPlatformBrowser(this.platformID)) {
      this.redraw();
    }
  }

  /**
   * update chart on data changes
   * todo: turn this into a subscription or getter/setter like other visualizations
   * @param changes
   */
  ngOnChanges(changes) {
    if ((changes.data && !changes.data.firstChange) && isPlatformBrowser(this.platformID)) {
      this.redraw();
    }
  }

  redraw(){
    this.drawChart();
    this.updateChart();
  }

  /**
   * draw chart svg and labels
   */
  drawChart(): void {
    const element = this.chartContainer.nativeElement;
    this.chartArea = d3.select(element);
    this.chartArea.selectAll('svg').remove();
    const edge = Math.min(element.offsetHeight, element.offsetWidth);
    this.width = edge - this.margin.left - this.margin.right;
    this.height = edge - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    const width = this.width + this.margin.left + this.margin.right;
    const height = this.height + this.margin.top + this.margin.bottom * 2;
    if (width > 0 && height > 0) {
      const svg = this.chartArea.append('svg')
        .attr('id', this.svgID)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'donut-container');
      svg.append('g')
        .attr('class', 'slices');
      svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    }
  }

  /**
   * update chart as data changes
   */
  updateChart(): void {
    this.chartArea.selectAll('.toolCircle').remove();
    const pie = d3.pie()
      .sort((a, b) => {
        return a.count - b.count;
      })
      .value(d => d.count);

    const arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius * 0.7)
      .cornerRadius(3)
      .padAngle(.015);

    // this arc is used for aligning the text labels
    const outerArc = d3.arc()
      .outerRadius(this.radius * 0.9)
      .innerRadius(this.radius * 0.9);

    const key = (d => d.data.name);

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
    const div = this.chartArea.select('.donut-container').append('g')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    /* ------- PIE SLICES -------*/

    const slice = this.chartArea.select('.slices').selectAll('path.slice')
      .data(pie(this.data), key);

    slice.enter()
      .insert('path')
      .style('fill', (d => color(d.data.name)))
      .attr('class', 'slice')
      .attr('d', arc)

    .on('mouseover', (event, d) => {
      this.chartArea.selectAll('.toolCircle').remove();
      this.addTooltip(div, d, color);
      })
    .on('mouseout', (event, d) => {
      /*  div.transition()
          .duration(500)
          .style('opacity', 0);*/
      })
    .on('click', (event, d) => {
        this.clickSlice.emit(d.data);
      });

    slice.exit()
      .remove();

    const firstSlice = this.chartArea.select('.slices').selectAll('path.slice').data()[0];
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
    if (!d){return; }
    element.append('circle')
      .attr('class', 'toolCircle')
      .attr('r', this.radius * 0.65) // radius of tooltip circle
      .style('fill', color(d.data.name)) // colour based on category mouse is over
      .style('fill-opacity', 0.35);
    element.append('text')
      .attr('class', 'toolCircle')
      .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.data.name); // add text to the circle.
    element.append('text')
      .attr('class', 'toolCircle value')
      .attr('dy', 30) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.data.count);
    element.transition()
      .duration(200)
      .style('opacity', .9);
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

