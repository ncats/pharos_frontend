import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

/**
 * rectangular legend for continuous color scheme. base on:
 * https://beta.observablehq.com/@tmcw/d3-scalesequential-continuous-color-legend-example
 */
@Component({
  selector: 'app-d3-color-legend',
  templateUrl: './d3-color-legend.component.html',
  styleUrls: ['./d3-color-legend.component.scss']
})
export class D3ColorLegendComponent implements OnInit {
  @ViewChild('colorScaleTarget') chartContainer: ElementRef;
  @Input() range: any;

  constructor() { }

  ngOnInit() {
    const element = this.chartContainer.nativeElement;
    const margin = {top: 0, right: -5, bottom: 0, left: 5};
    const width = element.offsetWidth;
    const height = 20;
    const barHeight = 20;
    const svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '30');
    const defs = svg.append('defs');

    const colorScale = d3.scaleSequential(d3.interpolateViridis).domain(this.range);

    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient');

    const axisScale = d3.scaleLinear()
      .domain(colorScale.domain())
      .range([margin.left, width - margin.right]);

    const axisBottom = g => g
      .attr('class', `x-axis`)
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(axisScale)
        .ticks(width / 80)
        .tickSize(-barHeight));

    linearGradient.selectAll('stop')
      .data(colorScale.ticks().reverse().map((t, i, n) => {
        return ({ offset: `${100 * i / n.length}%`, color: colorScale((t / 2) + 3) });
      }))
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom - barHeight})`)
      .append('rect')
      .attr('transform', `translate(${margin.left}, 0)`)
      .attr('width', width - margin.right - margin.left)
      .attr('height', barHeight)
      .style('fill', 'url(#linear-gradient)');

    svg.append('g')
      .call(axisBottom);
  }
}
