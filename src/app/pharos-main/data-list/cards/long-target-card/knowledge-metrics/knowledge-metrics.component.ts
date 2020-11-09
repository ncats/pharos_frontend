import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
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
