import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-target-disease-heatmap',
  templateUrl: './target-disease-heatmap.component.html',
  styleUrls: ['./target-disease-heatmap.component.scss']
})
export class TargetDiseaseHeatmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rowParseFunction(row: any) {
    return {
      xVal: row.sym,
      yVal: row.name,
      stringVal: row.mean.toString(),
      numVal: row.mean,
      data: {}
    };
  }
}
