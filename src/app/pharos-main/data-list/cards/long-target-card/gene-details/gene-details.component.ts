import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-gene-details',
  templateUrl: './gene-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class GeneDetailsComponent extends DynamicPanelComponent implements OnInit{
  constructor(
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }
  @Input() target?: Target;
  @Input() apiSources: any[];

  ngOnInit(): void {
  }
  getTooltip(label: string): string {
    if (this.apiSources) {
      const tooltip = this.apiSources.filter(source => source.field === label);
      if (tooltip.length) {
        return tooltip[0].description;
      } else {
        return null;
      }
    }
  }
}
