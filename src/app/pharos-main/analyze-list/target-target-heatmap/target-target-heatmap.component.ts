import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-target-target-heatmap',
  templateUrl: './target-target-heatmap.component.html',
  styleUrls: ['./target-target-heatmap.component.scss']
})
export class TargetTargetHeatmapComponent extends DynamicPanelComponent implements OnInit {

  constructor(public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  selectedDetails: any = {};

  ngOnInit(): void {}

  updateSelectedDetails(newDetails) {
    this.selectedDetails = newDetails[0];
  }

  rowParseFunction(row: any) {
    return {
      xVal: row.preferredSymbol,
      yVal: row.otherPreferredSymbol,
      stringVal: Number.parseFloat(row.score) ? row.score.toString() : null,
      numVal:  row.score || 0,
      metadata: {
        y: row.otherUniprot,
        linkY: row.otherPreferredSymbol,
        x: row.uniprot,
        linkX: row.preferredSymbol,
        displayY: row.otherPreferredSymbol,
        displayX: row.preferredSymbol
      }
    };
  }

}
