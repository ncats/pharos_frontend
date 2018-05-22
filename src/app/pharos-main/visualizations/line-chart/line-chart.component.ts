import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import {CustomContentDirective} from '../../../tools/custom-content.directive';

@Component({
  selector: 'pharos-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent  implements OnInit, OnChanges {
  @ViewChild('lineChartTarget') chartContainer: ElementRef;
 // @ViewChild(CustomContentDirective) chartContainer: CustomContentDirective;

  @Input() data: any[] = [];
  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  globalCounts: any[] = [];
  groupCounts: any[] = [];
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

    this.drawGraph();
   // this.mapData();
   // this.updateGraph();
  }

  ngOnChanges(changes) {
    if (!changes.data.firstChange) {
      if (this.data.length > 0) {
        this.mapData();
        this.updateGraph();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    d3.select('pharos-line-chart svg').remove();
    this.drawGraph();
    this.updateGraph();
  }

  drawGraph(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'line-container');

        // Add the X Axis
    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.height + ')');

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(20, 0)');

    // Add the valueline path.
    svg.append('path')
      .attr('class', 'timeline')
      .attr('transform', 'translate(' + this.margin.left + ',0)' )
      .style("filter" , "url(#glow)");

    //Filter for the outside glow
    const filter = svg.append('defs').append('filter').attr('id','glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

    d3.select(element).append('div')
      .attr('class', 'line-tooltip')
      .style('opacity', 0);

  }

  mapData() {
    this.globalCounts = [];
    this.groupCounts = [];
    if (this.data.length > 0) {
      this.data[0].events.forEach(event => {
        const val = event.properties.filter(prop => prop.label === 'Score');
        if (val.length > 0) {
          this.globalCounts.push(val[0].numval);
          this.groupCounts.push({key: event.start, value: val[0].numval});
        } else {
          this.globalCounts.push(event.end);
          this.groupCounts.push({key: event.start, value: event.end});
        }
      });
      if (this.groupCounts.length === 1) {
        this.groupCounts.push({key: this.groupCounts[0].key + 1, value: 0});
        this.groupCounts.push({key: this.groupCounts[0].key - 1, value: 0});
      }
      this.groupCounts.sort((a, b) => a.key - b.key);
    }
  }

  updateGraph(): void {
    const x = d3.scalePoint()
      .domain(this.groupCounts.map(d => d.key))
      .rangeRound([0, this.width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(this.groupCounts, (d) => d.value))
      .rangeRound([this.height, 0]);

    const line = d3.line()
      .x(function(d) { return x(+d.key); })
      .y(function(d) { return y(+d.value); });



/*    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.globalCounts)])
      .range([this.height, 0]);

    // Compute an ordinal xScale for the keys in boxPlotData
    const xScale = d3.scalePoint()
      .domain(this.groupCounts.map(point => point.key))
      .rangeRound([0, this.width])
      .padding([0.5]);

    // create dose response line
    const valueline = d3.line()
      .x((d) => d.key)
      .y((d) => d.value);*/

    d3.select('.xaxis')
      .call(d3.axisBottom(x));

    d3.select('.yaxis')
      .call(d3.axisLeft(y));

    d3.select('.timeline')   // change the line
      .datum(this.groupCounts)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke', '#23364e')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line);

  }
}



