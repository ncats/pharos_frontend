import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';
import {DynamicPanelBaseComponent} from '../../../../../tools/dynamic-panel-base/dynamic-panel-base.component';
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
  selector: 'pharos-gene-details',
  templateUrl: './gene-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class GeneDetailsComponent extends DynamicPanelBaseComponent implements OnInit{
  constructor() {
    super();
  }
  @Input() expanded = false;
  @Input() target?: Target;

  ngOnInit(): void {
  }
}
