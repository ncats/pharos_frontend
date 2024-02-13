import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {MatCardSubtitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
      CommonModule,
    PropertyDisplayComponent,
    MatCardSubtitle
  ],
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
