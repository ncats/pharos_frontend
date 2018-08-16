import {Component, Input, OnInit} from '@angular/core';
import {Ligand} from '../../../../../models/ligand';

@Component({
  selector: 'pharos-ligand-card',
  templateUrl: './ligand-card.component.html',
  styleUrls: ['./ligand-card.component.css']
})
export class LigandCardComponent implements OnInit {
@Input() ligand: Ligand;
  constructor() { }

  ngOnInit() {
  }

}
