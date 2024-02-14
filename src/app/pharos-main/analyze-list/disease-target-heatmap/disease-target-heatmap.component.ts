import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {CrossListHeatmapComponent} from '../cross-list-heatmap/cross-list-heatmap.component';
import {
  DiseaseAssociationGridComponent
} from '../../data-details/target-details/panels/disease-source-panel/disease-association-grid/disease-association-grid.component';

@Component({
  standalone: true,
  imports: [
    CrossListHeatmapComponent,
    DiseaseAssociationGridComponent
  ],
  selector: 'pharos-disease-target-heatmap',
  templateUrl: './disease-target-heatmap.component.html',
  styleUrls: ['./disease-target-heatmap.component.scss']
})
export class DiseaseTargetHeatmapComponent extends DynamicPanelComponent implements OnInit {

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
      yVal: row.preferredSymbol,
      xVal: row.name,
      stringVal: row.count.toString(),
      numVal: row.count,
      metadata: {
        x: row.name,
        y: row.uniprot,
        linkY: row.preferredSymbol,
        displayX: row.name,
        displayY: row.preferredSymbol
      }
    };
  }
}
