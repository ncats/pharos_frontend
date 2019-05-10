import {Component, Input} from '@angular/core';
import {Ligand} from '../../../../models/ligand';

/**
 * displays ligand header component
 */
@Component({
  selector: 'pharos-ligand-header',
  templateUrl: './ligand-header.component.html',
  styleUrls: ['./ligand-header.component.scss']
})
export class LigandHeaderComponent {
  /**
   * ligand to be displayed
   */
  @Input() ligand: Ligand;

  /**
   * no args constructor
   */
  constructor() { }
  }
