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

  selectedDetails: any[] = [];

  ngOnInit(): void {

  }
  updateSelectedDetails(newDetails) {
    this.selectedDetails = newDetails;
  }

  rowParseFunction(row: any) {
    return {
      xVal: row.preferredSymbol,
      yVal: row.name,
      stringVal: row.count.toString(),
      numVal: row.count,
      metadata: {
        y: row.name,
        x: row.uniprot,
        linkX: row.preferredSymbol,
        displayY: row.name,
        displayX: row.preferredSymbol
      }
    };
  }
}
