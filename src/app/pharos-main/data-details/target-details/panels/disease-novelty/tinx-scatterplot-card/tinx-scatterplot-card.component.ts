import {Component, Input, OnInit} from '@angular/core';
import {ScatterOptions} from '../../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {MatCardModule} from '@angular/material/card';
import {ScatterPlotComponent} from '../../../../../../tools/visualizations/scatter-plot/scatter-plot.component';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatCardModule, CommonModule,
    ScatterPlotComponent,
  ],
  selector: 'pharos-tinx-scatterplot-card',
  templateUrl: './tinx-scatterplot-card.component.html',
  styleUrls: ['./tinx-scatterplot-card.component.scss']
})
export class TinxScatterplotCardComponent implements OnInit {

  /**
   * display options for the tinx plot
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    line: false,
    xAxisScale: 'log',
    yAxisScale: 'log',
    xLabel: 'Novelty',
    yLabel: 'Importance',
    margin: {top: 20, right: 35, bottom: 50, left: 50}
  });
  @Input() tinx: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
