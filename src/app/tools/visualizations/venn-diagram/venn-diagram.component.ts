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
import * as d3 from 'd3';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'pharos-venn-diagram',
  templateUrl: './venn-diagram.component.html',
  styleUrls: ['./venn-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VennDiagramComponent implements OnInit, OnChanges {

  @ViewChild('vennTarget', {static: true}) chartContainer: ElementRef;
  private margin: any = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  height: number;
  width: number;

  get fixedHeight(): number {
    const baseHeight = 130/2;
    const scaleHeight = baseHeight * this.width / 500;
    return Math.min(baseHeight, scaleHeight);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.drawChart();
  }

  @Input() data: VennDiagramData;

  constructor(@Inject(PLATFORM_ID) private platformID: Object) {
  }

  tooltip: any;

  ngOnInit(): void {
    const element = this.chartContainer.nativeElement;
    if (isPlatformBrowser(this.platformID)) {
      this.drawChart();
    }
  }

  ngOnChanges(changes) {
    if (!changes.data.firstChange && isPlatformBrowser(this.platformID)) {
      this.drawChart();
    }
  }

  AreaToRadius(size: number) {
    return Math.sqrt(size / Math.PI);
  }

  calcMeasurements(areaA: number, areaB: number, overlap: number) {
    const radA: number = this.AreaToRadius(areaA);
    const radB: number = this.AreaToRadius(areaB);
    const maxSize: number = Math.max(radA, radB);
    let distObj: any;
    if (areaA === overlap || areaB === overlap) {
      distObj = {dist: Math.abs(radA - radB), thetaA: Math.PI * 2, thetaB: Math.PI * 2};
    } else {
      distObj = this.findDistanceBetweenCircles(radA, radB, overlap);
    }
    const retVal: { radA: number, radB: number, dist: number, thetaA: number, thetaB: number } = {
      radA: radA / maxSize,
      radB: radB / maxSize,
      dist: distObj.dist / maxSize,
      thetaA: distObj.thetaA,
      thetaB: distObj.thetaB
    };
    return retVal;
  }

  findDistanceBetweenCircles(radA: number, radB: number, reqOverlap: number) {
    let dist: number = (radA + radB) / 2;
    let jumpSize: number = dist / 2;
    let overlapObj = this.calculateOverlap(radA, radB, dist);
    let calcOverlap = overlapObj.area;
    let attempts = 0;
    while ((Math.abs(calcOverlap - reqOverlap) > 0.01) && (attempts < 20)) {
      if (calcOverlap > reqOverlap) {
        dist = dist + jumpSize;
      } else {
        dist = dist - jumpSize;
      }
      overlapObj = this.calculateOverlap(radA, radB, dist);
      calcOverlap = overlapObj.area;
      jumpSize = jumpSize / 2;
      attempts += 1;
    }
    return {dist: dist, thetaA: overlapObj.thetaA, thetaB: overlapObj.thetaB};
  }

  calculateOverlap(radA: number, radB: number, distance: number): { area: number, thetaA: number, thetaB: number } {
    if (radA > (distance + radB) || radB > (distance + radA)) {
      const minRad = Math.min(radA, radB);
      return {area: Math.PI * minRad ** 2, thetaA: Math.PI * 2, thetaB: Math.PI * 2};
    }
    const distA: number = (distance ** 2 - radB ** 2 + radA ** 2) / (2 * distance);
    const thetaA: number = Math.acos(distA / radA);
    const wedgeA: number = radA ** 2 * thetaA;
    const triangleA: number = distA * Math.sqrt(radA ** 2 - distA ** 2);
    const lensA: number = wedgeA - triangleA;

    const distB: number = (distance ** 2 - radA ** 2 + radB ** 2) / (2 * distance);
    const thetaB: number = Math.acos(distB / radB);
    const wedgeB: number = radB ** 2 * thetaB;
    const triangleB: number = distB * Math.sqrt(radB ** 2 - distB ** 2);
    const lensB: number = wedgeB - triangleB;

    return {area: lensA + lensB, thetaA: thetaA, thetaB: thetaB};
  }

  drawChart(): void {
    if(!this.data){
      return;
    }
    const measurements = this.calcMeasurements(this.data.sizeA, this.data.sizeB, this.data.overlap);

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let width = this.width + this.margin.left + this.margin.right;
    let height = this.height + this.margin.top + this.margin.bottom * 2;
    if (width > 0 && height > 0) {
      const svg = d3.select(element).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'venn-container');
      svg.append('g')
        .attr('class', 'sets');
      svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      svg.append('circle')
        .style('fill', this.data.colorB)
        .attr('cx', measurements.dist * this.fixedHeight / 2)
        .attr('cy', 0)
        .attr('r', measurements.radB * this.fixedHeight)
        .style('pointer-events', 'all')
        .on('mouseover', (d, i, circles) => this.showTooltip(d, i, circles, this.data.sizeB, this.data.nameB))
        .on('mouseout', (d, i, circles) => this.hideTooltip(d, i, circles));

      svg.append('circle')
        .style('fill', this.data.colorA)
        .attr('cx', -measurements.dist * this.fixedHeight / 2)
        .attr('cy', 0)
        .attr('r', measurements.radA * this.fixedHeight)
        .on('mouseover', (d, i, circles) => this.showTooltip(d, i, circles, this.data.sizeA, this.data.nameA))
        .on('mouseout', (d, i, circles) => this.hideTooltip(d, i, circles));

      const overlapSection = this.fetchOverlapShape(measurements);

      svg.append('path')
        .attr('d', overlapSection)
        .attr('fill', 'black')
        .attr('opacity', 0.25)
        .on('mouseover', (d, i, shape) => this.showTooltip(d, i, shape, this.data.overlap, 'Common'))
        .on('mouseout', (d, i, shape) => this.hideTooltip(d, i, shape));

      this.tooltip = d3.select('body').append('div')
        .attr('class', 'bar-tooltip')
        .style('opacity', 0);
    }
  }

  private fetchOverlapShape(measurements: { radA: number; radB: number; dist: number; thetaA: number; thetaB: number }) {
    const myPath = d3.path();

    if (this.data.sizeB === this.data.overlap && this.data.sizeA === this.data.overlap) {
      myPath.arc(0, 0, measurements.radA * this.fixedHeight, -Math.PI, Math.PI);
    } else {
      if (this.data.sizeB !== this.data.overlap) {
        myPath.arc(-measurements.dist * this.fixedHeight / 2, 0, measurements.radA * this.fixedHeight, -measurements.thetaA, measurements.thetaA);
      }
      if (this.data.sizeA !== this.data.overlap) {
        myPath.arc(measurements.dist * this.fixedHeight / 2, 0, measurements.radB * this.fixedHeight, Math.PI - measurements.thetaB, Math.PI + measurements.thetaB,);
      }
    }

    myPath.closePath();
    return myPath;
  }

  showTooltip(d, i, circles, size, name) {
    d3.select(circles[i]).classed('hovered', true);
    this.tooltip
      .transition()
      .duration(200)
      .style('opacity', .9);
    this.tooltip.html(`${name}: ${size}`)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
      .style('width', 100);
  }

  hideTooltip(d, i, circles) {
    d3.select(circles[i]).classed('hovered', false);
    this.tooltip
      .transition()
      .duration(200)
      .style('opacity', 0);
  }
}

export class VennDiagramData {
  facetName: string = '';
  sizeA: number = 0;
  sizeB: number = 0;
  nameA: string = '';
  nameB: string = '';
  colorA: string = '';
  colorB: string = '';
  overlap: number = 0;
}
