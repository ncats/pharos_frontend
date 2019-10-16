import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
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
export class LigandCardComponent implements OnInit, OnChanges {

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

  _STRUCTUREURLBASE: string;

  /**
   * no args constructor
   */
  constructor(
    private pharosConfig: PharosConfig
  ) {
  }

  /**
   * find prime activity based on ligand activites for the target
   */
  ngOnInit() {
    this._STRUCTUREURLBASE = this.pharosConfig.getStructureImageUrl();

    if (this.target) {
      this.primeActivity = [this.ligand.activities.filter(activity => this.target.gene === activity.target)[0]];
    }
    if (!this.ligand.imageUrl) {
      this.ligand.imageUrl = this.parseImageUrl();
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
    } else {
      return null;
    }
  }


  private parseImageUrl(): string {
    if (this.ligand['image']) {
     return `${this._STRUCTUREURLBASE}${this.ligand['image'].split('structure')[1]}`;
    } else {
      return this._STRUCTUREURLBASE + this.ligand['structureId'] + '.svg?size=250';
    }
  }

  /**
   * this handles if a target is passed in after init
   * @param changes
   */
  ngOnChanges(changes) {
    if (!changes.ligand.firstChange) {
      if (this.target) {
        this.primeActivity = [this.ligand.activities.sort(activity => this.target.gene === activity.target)[0]];
      }
      if (!this.ligand.imageUrl) {
        this.ligand.imageUrl = this.parseImageUrl();
      }
    }
  }
}
