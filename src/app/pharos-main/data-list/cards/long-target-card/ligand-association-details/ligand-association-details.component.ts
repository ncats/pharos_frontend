import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';
import {AssociationStats} from '../../../../../models/ligandAssociationDetails';

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

  formatActVal(val: AssociationStats){
    if (val.n === 1){
      return `${val.mean.toFixed(2)} (n=1)`;
    }
    return `${val.mean.toFixed(2)} +/- ${val.stderr.toFixed(2)} (n=${val.n})`;
  }
}
