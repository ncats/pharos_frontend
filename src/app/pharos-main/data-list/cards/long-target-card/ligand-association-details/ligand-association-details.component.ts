import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';

@Component({
  selector: 'pharos-ligand-association-details',
  templateUrl: './ligand-association-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class LigandAssociationDetailsComponent extends GeneDetailsComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
