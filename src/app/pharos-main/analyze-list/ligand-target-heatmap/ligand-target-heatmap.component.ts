import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-ligand-target-heatmap',
  templateUrl: './ligand-target-heatmap.component.html',
  styleUrls: ['./ligand-target-heatmap.component.scss']
})
export class LigandTargetHeatmapComponent extends DynamicPanelComponent implements OnInit {

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
      yVal: row.sym || row.uniprot,
      xVal: row.name,
      stringVal: Number.parseFloat(row.mean) ? row.mean.toPrecision(3) : null,
      numVal:  row.mean || 0,
      metadata: {
        x: row.identifier,
        y: row.uniprot,
        displayX: row.name,
        displayY: row.sym || row.uniprot
      }
    };
  }

}
