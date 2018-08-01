import {Component, Input, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';

@Component({
  selector: 'pharos-ligand-header',
  templateUrl: './ligand-header.component.html',
  styleUrls: ['./ligand-header.component.css']
})
export class LigandHeaderComponent implements OnInit {
  @Input() ligand: Ligand;
  constructor() { }

  ngOnInit() {
  }

}
