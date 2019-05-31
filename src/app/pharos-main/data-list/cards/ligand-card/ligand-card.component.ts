import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';
import {Target} from '../../../../models/target';

/**
 * component to display a condensed ligand view
 */
@Component({
  selector: 'pharos-ligand-card',
  templateUrl: './ligand-card.component.html',
  styleUrls: ['./ligand-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandCardComponent implements OnInit {

  /**
   * ligand input to display
   */
  @Input() ligand: Ligand;

  /**
   * optional target to display activity data for
   */
  @Input() target?: Target;

  /**
   * find the first target activity for the ligand
   */
  primeActivity: any;

  /**
   * no args constructor
   */
  constructor() {
  }

  /**
   * find prime activity based on ligand activites for the target
   */
  ngOnInit() {
    if (this.target) {
      this.primeActivity = [this.ligand.activities.sort(activity => this.target.gene === activity.target)[0]];

    }
  }

  /**
   * fetch and display activity for a ligand
   * @param activity
   * @returns {string}
   * @private
   */
  private _getActivityType(activity: any): string {
    let ret = '';
    if (activity) {
      if (activity.label === 'Potency' || activity.label === 'Pharmalogical Action') {
        ret = activity.label;
      } else if (activity.label === 'N/A') {
        ret = '';
      } else {
        ret = `p${activity.label}`;
      }
      return ret + ':';
    }
    else {
      return null;
    }
  }
}
