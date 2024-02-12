import { Component, OnInit } from '@angular/core';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {CrossListHeatmapComponent} from '../cross-list-heatmap/cross-list-heatmap.component';
import {
  PropertyDisplayComponent
} from '../../../tools/generic-table/components/property-display/property-display.component';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: [CommonModule, CrossListHeatmapComponent, MatCardModule, PropertyDisplayComponent],
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
