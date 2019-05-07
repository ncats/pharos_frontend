import {Component, Input} from '@angular/core';
import {Ligand} from '../../../../models/ligand';

@Component({
  selector: 'pharos-ligand-header',
  templateUrl: './ligand-header.component.html',
  styleUrls: ['./ligand-header.component.scss']
})
export class LigandHeaderComponent {
  @Input() ligand: Ligand;

  /**
   * no args constructor
   */
  constructor() { }
  }
