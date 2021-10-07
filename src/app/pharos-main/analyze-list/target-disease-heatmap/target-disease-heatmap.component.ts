import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-target-disease-heatmap',
  templateUrl: './target-disease-heatmap.component.html',
  styleUrls: ['./target-disease-heatmap.component.scss']
})
export class TargetDiseaseHeatmapComponent extends DynamicPanelComponent implements OnInit {

  constructor(public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

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
