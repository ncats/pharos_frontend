import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";

@Component({
  selector: 'pharos-interaction-details',
  templateUrl: './interaction-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})
export class InteractionDetailsComponent extends GeneDetailsComponent implements OnInit {

  constructor() {
    super();

  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
