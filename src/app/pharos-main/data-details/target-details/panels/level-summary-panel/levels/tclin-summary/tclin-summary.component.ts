import {Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

/**
 * shows details about tclin targets
 */
@Component({
  selector: 'pharos-tclin-summary',
  templateUrl: './tclin-summary.component.html',
  styleUrls: ['./tclin-summary.component.scss']
})
export class TclinSummaryComponent {
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
