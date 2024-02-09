import {Component, Input, OnInit} from '@angular/core';
import {Reagent} from '../../../../../../models/idg-resources/reagent';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {
  PropertyDisplayComponent
} from '../../../../../../tools/generic-table/components/property-display/property-display.component';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * Component to show a single reagent's information
 */
@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, PropertyDisplayComponent, FlexLayoutModule],
  selector: 'pharos-reagent-panel',
  templateUrl: './reagent-panel.component.html',
  styleUrls: ['./reagent-panel.component.scss']
})
export class ReagentPanelComponent implements OnInit {

  constructor()
  {}

  /**
   * I forget what this is. Oh yeah, it's the reagent whose data will be shown
   */
  @Input() reagent: Reagent;

  ngOnInit(): void {
  }
}
