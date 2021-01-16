import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../models/target";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {DynamicPanelBaseComponent} from "../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

@Component({
  selector: 'pharos-gene-details',
  templateUrl: './gene-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class GeneDetailsComponent extends DynamicPanelBaseComponent implements OnInit{
  constructor() {
    super();
  }
  @Input() expanded: boolean = false;
  @Input() target?: Target;

  ngOnInit(): void {
  }
}
