import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';
import {MatCardSubtitle} from '@angular/material/card';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';

@Component({
  standalone: true,
  imports: [
    MatCardSubtitle,
    PropertyDisplayComponent
  ],
  selector: 'pharos-knowledge-metrics',
  templateUrl: './knowledge-metrics.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class KnowledgeMetricsComponent extends GeneDetailsComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
