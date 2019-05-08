import {Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

/**
 * shows details about tdark targets
 */
@Component({
  selector: 'pharos-tdark-summary',
  templateUrl: './tdark-summary.component.html',
  styleUrls: ['./tdark-summary.component.scss']
})
export class TdarkSummaryComponent {
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
