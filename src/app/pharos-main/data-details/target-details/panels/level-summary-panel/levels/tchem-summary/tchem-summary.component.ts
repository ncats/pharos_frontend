import {Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

@Component({
  selector: 'pharos-tchem-summary',
  templateUrl: './tchem-summary.component.html',
  styleUrls: ['./tchem-summary.component.scss']
})
export class TchemSummaryComponent {
  /**
   * input target
   */
  @Input() target: Target;

  /**
   * additional data for tracking completion
   */
  @Input() data: any;

  /**
   * no args constructor
   */
  constructor() { }
}
