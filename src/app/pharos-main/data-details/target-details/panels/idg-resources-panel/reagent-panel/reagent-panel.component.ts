import {Component, Input, OnInit} from '@angular/core';
import {Reagent} from "../../../../../../models/idg-resources/reagent";

/**
 * Component to show a single reagent's information
 */
@Component({
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
