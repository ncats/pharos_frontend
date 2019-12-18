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
    // todo add harmonizome serializer or find out why mapped list data in the resolver doesn't work
    if (this.target.hgdata) {
      const data = this.target.hgdata as any;
      if (data.summary) {
        this.target.hgdata = data.summary;
      }
    }
  }
}
