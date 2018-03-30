import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pharos-sunburst-chart',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SunburstChartComponent implements OnInit {
  @ViewChild('sunburstChartTarget') chartContainer: ElementRef;
  @Input() data: any[] = [];
  private margin: any = {top: 20, bottom: 20, left: 10, right: 10};
  height: number;
  width: number;
  radius: number;
  donut: any;

  constructor() { }

  ngOnInit() {

  }
}
