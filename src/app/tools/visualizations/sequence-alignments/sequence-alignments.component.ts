import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3v7';
import {isPlatformBrowser} from '@angular/common';
import {nodeDebugInfo} from '@angular/compiler-cli/src/ngtsc/util/src/typescript';

@Component({
  selector: 'pharos-sequence-alignments',
  templateUrl: './sequence-alignments.component.html',
  styleUrls: ['./sequence-alignments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SequenceAlignmentsComponent implements OnInit {

  @Input() alignmentData: any[];
  @Input() options: AlignmentDataOptions = {};

  constructor(@Inject(PLATFORM_ID) private platformID: any) {}

  @ViewChild('alignemntTarget', {static: true}) chartContainer: ElementRef;
  private margin: any = {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50
  };

  height: number;
  width: number;
  tooltip: any;
  rowSize = 10;
  subjectGap = 15;
  labelGap = 150;
  cumulativePlotHeight = 100;
  plotBuffer = 40;

  @HostListener('window:resize', [])
  onResize() {
    this.drawChart();
  }

  ngOnInit(): void {
    const element = this.chartContainer.nativeElement;
    if (isPlatformBrowser(this.platformID)) {
      this.drawChart();
    }
  }

  public redraw() {
    if (this.alignmentData) {
      this.drawChart();
    }
  }

  // ngOnChanges(changes) {
  //   if (!changes.data.firstChange && isPlatformBrowser(this.platformID)) {
  //     this.drawChart();
  //   }
  // }

  drawChart(): void {
    if (!this.alignmentData){
      return;
    }
    const allAlignments = [];
    let idx = 0;
    this.alignmentData.forEach(subject => {
      allAlignments.push(...subject.alignments.map(a => {
        return {alignment: a, parentIndex: idx}
      }));
      idx ++;
    });

    const jumpMap: Map<number, any> = new Map<number, any>();
    allAlignments.forEach(a => {
      let jump = jumpMap.get(a.alignment.qstart) || {step: 0};
      jumpMap.set(a.alignment.qstart, jump);
      jump.step++;

      jump = jumpMap.get(a.alignment.qend) || {step: 0};
      jumpMap.set(a.alignment.qend, jump);
      jump.step--;
    });

    var mapAsc = new Map([...jumpMap.entries()].sort((a, b) => Number.parseInt(a.toString()) - Number.parseInt(b.toString())));

    let lastPoint = {x: mapAsc.keys().next().value, y: 0};
    const summaryPlot = [];
    mapAsc.forEach((val, key) => {
      const newX = Number.parseInt(key.toString());
      summaryPlot.push({x: newX, y: lastPoint.y});
      const newPoint = {x: newX, y: lastPoint.y + val.step};
      summaryPlot.push(newPoint);
      lastPoint = newPoint;
    });

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const plotWidth = this.width - this.labelGap;
    const height = this.plotBuffer + this.cumulativePlotHeight + (allAlignments.length * this.rowSize) + (this.alignmentData.length * this.subjectGap) + this.margin.bottom;
    if (plotWidth > 0 && height > 0) {

      // Create scales
      const xScale = d3.scaleLinear()
        .domain([1, Math.max(...allAlignments.map(f => f.alignment.qend))])
        .range([0, plotWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, this.alignmentData.length])
        .range([0, this.alignmentData.length * (this.rowSize + this.subjectGap)]);


      const zScale = d3.scaleLinear()
        .domain([0, 100])
        .range(['#ffffff', '#000000']);

      const svg = d3.select(element).append('svg')
        .attr('width', this.width)
        .attr('height', height)
        .append('g')
        .attr('class', 'plot-container');

      this.drawLegend(svg, zScale);
      this.drawSummaryPlot(summaryPlot, svg, xScale, plotWidth);

      svg.append('g')
        .attr('class', 'subjects');

      svg.append('g')
        .attr('class', 'labels');

      const labels = svg.select('.labels')
        .selectAll('.label')
        .data(this.alignmentData)
        .enter().append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'text-before-edge')
        .attr('x', 0)
        .attr('y', (d, idx) => {
          const count = allAlignments.filter(f => f.parentIndex < idx).length;
          return this.plotBuffer + this.cumulativePlotHeight + count * this.rowSize + (idx + 1) * this.subjectGap;
        })
        // .attr('transform', 'translate(-' + (this.margin.left * 3 / 4) + ',-' + (this.margin.top * 9 / 10) + ')')
        .text(d => d.sym || d.uniprot)
        .style('cursor', 'pointer')
        .style('pointer-events', 'all')
        .on('click', (event, d) => {
          if (this.options?.labelClick) {
            this.options.labelClick(d);
          }
        });

      const subjects = svg.select('.subjects')
        .selectAll('.subject')
        .data(this.alignmentData)
        .enter().append('rect')
        .attr('class', 'subject')
        .attr('x', d => this.labelGap)
        .attr('width', plotWidth)
        .attr('y', (d, idx) => {
          const count = allAlignments.filter(f => f.parentIndex < idx).length;
          return this.plotBuffer + this.cumulativePlotHeight + count * this.rowSize + (idx + 1) * this.subjectGap;
        })
        .attr('height', d => d.alignments.length * this.rowSize)
        // .classed('hovered', (a, b, c) => {
        //   return this.clickedTissue && this.clickedTissue === a.data;
        // })
        .style('fill', 'transparent')
        .style('stroke', 'gray');

      const alignments = svg.select('.subjects').selectAll('.alignment')
        .data(allAlignments)
        .enter().append('rect')
        .attr('class', 'alignment')
        .attr('x', d => xScale(d.alignment.qstart) + this.labelGap)
        .attr('width', d => xScale(d.alignment.qend - d.alignment.qstart))
        .attr('y', (d, idx) => {
          return this.plotBuffer + this.cumulativePlotHeight + idx * this.rowSize + (d.parentIndex + 1) * this.subjectGap;
        })
        .attr('height', this.rowSize)
        // .classed('hovered', (a, b, c) => {
        //   return this.clickedTissue && this.clickedTissue === a.data;
        // })
        .style('fill', d => zScale(d.alignment.pident))
        // .style('stroke', 'black')
        .style('cursor', 'pointer')
        .style('pointer-events', 'all');

      alignments.on('mouseover', (event, d) => {
        const blocks = alignments.nodes();
        const i = blocks.indexOf(event.currentTarget);
        d3.select(blocks[i]).classed('hovered', true);
        this.tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        this.tooltip.html(`
        <span>
            <b>Bitscore: </b>${d.alignment.bitscore}<br />
            <b>Expect Value: </b>${d.alignment.evalue}<br />
            <b>Gaps: </b>${d.alignment.gapopen}<br />
            <b>Mismatches: </b>${d.alignment.mismatch}<br />
            <b>Percent Identical: </b>${d.alignment.pident}<br />
            <b>Length: </b>${d.alignment.length}<br />
            <b>Expect Value: </b>${d.alignment.evalue}<br />
            <b>Query Start: </b>${d.alignment.qstart}<br />
            <b>Query End: </b>${d.alignment.qend}<br />
            <b>Subject Start: </b>${d.alignment.sstart}<br />
            <b>Subject End: </b>${d.alignment.send}<br />
        </span>`)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY + 'px');
      })
        .on('mouseout', (event, d) => {
          const blocks = alignments.nodes();
          const i = blocks.indexOf(event.currentTarget);
          this.tooltip
            .transition()
            .duration(200)
            .style('opacity', 0);
          d3.select(blocks[i]).classed('hovered', false);
        });

      this.tooltip = d3.select('body').append('div')
        .attr('class', 'twodtooltip')
        .style('opacity', 0);
    }
  }

  private drawLegend(svg, zScale: any) {
    svg.append('g').attr('class', 'legend');
    svg.append('g').attr('class', 'legendTicks');
    svg.append('g').attr('class', 'zLabel');

    const legend = svg.select('.legend').selectAll('.block')
      .data(this.getLegendRange())
      .enter().append('rect')
      .attr('class', 'block')
      .attr('x', 30)
      .attr('width', 20)
      .attr('y', (d, i) => 10 + i * 20)
      .attr('height', 20)
      .style('fill', d => zScale(d.val))
      .style('stroke', 'gray');
    // .attr('transform', 'translate(-' + (this.margin.left * 3 / 4) + ',-' + (this.margin.top * 9 / 10) + ')');

    const legendTicks = svg.select('.legendTicks').selectAll('.tick')
      .data(this.getLegendRange())
      .enter().append('text')
      .attr('class', 'tick')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'text-before-edge')
      .attr('x', 55)
      .attr('y', (d, i) => 12 + i * 20)
      // .attr('transform', 'translate(-' + (this.margin.left * 3 / 4) + ',-' + (this.margin.top * 9 / 10) + ')')
      .text(d => d.val);

    const zLabel = svg.select('.zLabel')
      .append('text')
      .attr('x', d => -60)
      .attr('y', d => 20)
      .attr('text-anchor', 'middle')
      // .attr('transform', d => 'translate(-' + (this.margin.left * 3 / 4) + ',-' + (this.margin.top * 9 / 10) + ') rotate(-90)')
      .attr('transform', d => 'rotate(-90)')
      .text('% Identity');
  }

  private drawSummaryPlot(summaryPlot: any[], svg, xScale: any, plotWidth: number) {
    svg.append('g').attr('class', 'yLabel');
    svg.append('g').attr('class', 'xLabel');

    const summaryYScale = d3.scaleLinear()
      .domain([0, 1.05 * Math.max(...summaryPlot.map(x => x.y))])
      .range([this.cumulativePlotHeight, 0]);

    const delaunay = d3.Delaunay.from(summaryPlot, d => xScale(d.x), d => summaryYScale(d.y));
    const voronoi = delaunay.voronoi([0, 0, plotWidth, this.cumulativePlotHeight]);
    svg
      .selectAll('path.cell')
      .data(summaryPlot)
      .enter()
      .append('path')
      .attr('class', 'cell')
      .attr('opacity', 0)
      .attr('d', (d, i) => voronoi.renderCell(i))
      .attr('transform', d => 'translate(' + (this.labelGap) + ',0)')
      .on('mouseenter', (event, d) => {
        const count = Math.max(...summaryPlot.filter(x => x.x === d.x).map(x => x.y));
        this.tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        this.tooltip.html(`
        <span>
            <b>Residue: </b>${d.x}<br />
            <b>Count: </b>${count}<br />
        </span>`)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY + 'px');
      }).on('mouseout', (event, d) => {
      this.tooltip
        .transition()
        .duration(200)
        .style('opacity', 0);
    });

    svg.append('g')
      .append('path')
      .datum(summaryPlot)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => xScale(d.x))
        .y(d => summaryYScale(d.y))
      )
      .attr('transform', d => 'translate(' + (this.labelGap) + ',0)');

    const yAxis = d3.axisLeft(summaryYScale)
      .ticks(5)
      .tickSize(-this.width)
      .tickPadding(5);

    // Add the Y Axis
    const gY = svg.append('svg:g')
      .attr('class', 'axis yaxis')
      .call(yAxis)
      .attr('transform', d => 'translate(' + (this.labelGap) + ',0)');

    const xAxis = d3.axisBottom(xScale);
      // .ticks(5)
      // .tickSize(-this.width)
      // .tickPadding(5);

    const gX = svg.append('svg:g')
      .attr('class', 'axis xaxis')
      .call(xAxis)
      .attr('transform', d => 'translate(' + (this.labelGap) + ', ' + (this.cumulativePlotHeight) + ')');

    const yLabel = svg.select('.yLabel')
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'translate(' + (this.labelGap - 30) + ',' + 50 + ') rotate(-90)')
      .text('Subject Count');

    const xLabel = svg.select('.xLabel')
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'translate(' +(plotWidth / 2 + this.labelGap) + ',' + (this.cumulativePlotHeight + 35) + ')')
      .text('Query Sequence Residue');
  }

  getLegendRange() {
    const stepSize = 25;
    const firstStep = 0;
    const range = [];
    for (let i = 0 ; i <= 4 ; i++ ) {
      range.push({index: i, val: (firstStep + i * stepSize)});
    }
    return range;
  }
}

export class AlignmentDataOptions {
  labelClick?: Function;
}
