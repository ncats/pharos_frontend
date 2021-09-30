import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-target-disease-heatmap',
  templateUrl: './target-ligand-heatmap.component.html',
  styleUrls: ['./target-ligand-heatmap.component.scss']
})
export class TargetLigandHeatmapComponent implements OnInit {

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
