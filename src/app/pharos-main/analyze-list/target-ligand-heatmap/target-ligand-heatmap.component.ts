import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {LigandSerializer} from '../../../models/ligand';
import {CrossListHeatmapComponent} from '../cross-list-heatmap/cross-list-heatmap.component';
import {
  TargetRelevanceTableComponent
} from '../../data-details/ligand-details/panels/target-relevance-panel/target-relevance-table/target-relevance-table.component';

@Component({
  standalone: true,
  imports: [
    CrossListHeatmapComponent,
    TargetRelevanceTableComponent
  ],
  selector: 'pharos-target-ligand-heatmap',
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
    const serializer = new LigandSerializer();
    const ligand = serializer.fromJson(row);
    return {
      xVal: row.preferredSymbol,
      yVal: ligand.getDisplayName(),
      stringVal: Number.parseFloat(row.mean) ? row.mean.toPrecision(3) : null,
      numVal:  row.mean || 0,
      metadata: {
        y: row.identifier,
        x: row.uniprot,
        linkX: row.preferredSymbol,
        displayY: ligand.getDisplayName(),
        displayX: row.preferredSymbol
      }
    };
  }

}
