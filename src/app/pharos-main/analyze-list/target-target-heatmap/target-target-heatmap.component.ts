import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../models/pharos-property';

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
      xVal: row.sym || row.uniprot,
      yVal: row.otherSym || row.otherUniprot,
      stringVal: Number.parseFloat(row.score) ? row.score.toString() : null,
      numVal:  row.score || 0,
      metadata: {
        y: row.otherUniprot,
        x: row.uniprot,
        displayY: row.otherSym || row.otherUniprot,
        displayX: row.sym || row.uniprot
      }
    };
  }

}
