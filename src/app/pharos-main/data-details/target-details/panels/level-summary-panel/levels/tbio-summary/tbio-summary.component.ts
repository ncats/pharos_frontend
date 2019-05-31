import {Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

/**
 * shows details about tbio targets
 */
@Component({
  selector: 'pharos-tbio-summary',
  templateUrl: './tbio-summary.component.html',
  styleUrls: ['./tbio-summary.component.scss']
})
export class TbioSummaryComponent {
  /**
   * input target
   */
  @Input() target: Target;

  /**
   * additional data for tracking completion
   */
  @Input() data: any;

  @Input() apiSources: any[];
  /**
   * no args constructor
   */
  constructor() {
  }

  getTooltip(label: string): string {
    return this.apiSources.filter(source => source.field === label)[0].description;
  }
}
