import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-target-disease-heatmap',
  templateUrl: './target-ligand-heatmap.component.html',
  styleUrls: ['./target-ligand-heatmap.component.scss']
})
export class TargetLigandHeatmapComponent extends DynamicPanelComponent implements OnInit {

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
      xVal: row.sym || row.uniprot,
      yVal: row.name,
      stringVal: row.mean.toString(),
      numVal: row.mean,
      metadata: {
        y: row.identifier,
        x: row.uniprot,
        displayY: row.name,
        displayX: row.sym || row.uniprot
      }
    };
  }

}
