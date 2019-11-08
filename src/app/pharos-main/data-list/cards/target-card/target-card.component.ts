import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../config/pharos-config';
import {Target} from '../../../../models/target';

/**
 * component to display a consolidated target view
 */
@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetCardComponent implements OnInit {
  /**
   * target to display. optional because it may also get injected
   */
  @Input() target?: Target;

  /**
   * boolean to display knowedge chart under radar chart
   * @type {boolean}
   */
  @Input() showKnowledge = false;

  constructor() {

  }

  /**
   * if target exists, fetch radar chart data
   */
  ngOnInit() {
    if (this.target['target']) {
      this.target = this.target['target'];
    }
  }
}
