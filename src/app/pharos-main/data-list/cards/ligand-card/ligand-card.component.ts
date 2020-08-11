import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';
import {Target} from '../../../../models/target';
import {PharosConfig} from '../../../../../config/pharos-config';

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
   * whether to have the link open in a new window, for target details pages, or stay in the same window, like the main list view
   */
  @Input() internalLink = false;

  /**
   * find the first target activity for the ligand
   */
  primeActivity: any;

  constructor(
    private ref: ChangeDetectorRef
  ) {
  }

  /**
   * find prime activity based on ligand activites for the target
   */
  ngOnInit() {
    if (this.ligand.activities) {
      const actArr = [...this.ligand.activities.map(act => act.activities)[0]];

      this.primeActivity = actArr.filter(act => act.moa);
      if (this.primeActivity.length === 0) {
        this.primeActivity = actArr.filter(act => act.type === 'Kd' || act.type === 'Ki');
      }
      if (this.primeActivity.length === 0) {
        this.primeActivity = actArr.sort((a, b) => a.value - b.value);
      }
      if (this.primeActivity.length > 0) {
        this.primeActivity = this.primeActivity.pop();
      }
      this.ref.markForCheck();
    }

    if (this.ligand.name.length > 50) {
      this.ligand.synonyms.forEach(syn => {
        if (syn.name === 'ChEMBL') {
          this.ligand.chemblName = syn.value;
        }
      });
    }
  }
}
