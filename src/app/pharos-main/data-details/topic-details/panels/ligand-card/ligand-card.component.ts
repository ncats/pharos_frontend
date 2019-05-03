import {Component, Input, OnInit} from '@angular/core';
import {Ligand} from '../../../../../models/ligand';
import {Target} from '../../../../../models/target';

@Component({
  selector: 'pharos-ligand-card',
  templateUrl: './ligand-card.component.html',
  styleUrls: ['./ligand-card.component.css']
})
export class LigandCardComponent implements OnInit {
@Input() ligand: Ligand;
@Input() target?: Target;
  primeActivity: any;
  constructor() { }

  ngOnInit() {
    if (this.target) {
      this.primeActivity = [this.ligand.activities.sort(activity => this.target.gene === activity.target)[0]];
    }
  }

  private _getActivityType(activity: any): string {
    let ret = '';
    if (activity.label === 'Potency' || activity.label === 'Pharmalogical Action') {
      ret = activity.label;
    } else if (activity.label === 'N/A') {
      ret = '';
    } else {
      ret = `p${activity.label}`;
    }
    return ret + ':';
  }
}
