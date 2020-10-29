import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-interaction-details',
  templateUrl: './interaction-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})
export class InteractionDetailsComponent extends GeneDetailsComponent implements OnInit {

  constructor(public navSectionsService: NavSectionsService) {
    super(navSectionsService);

  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
