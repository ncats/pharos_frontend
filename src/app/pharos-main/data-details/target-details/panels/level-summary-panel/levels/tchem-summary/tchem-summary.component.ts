import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

/**
 * shows details about tchem targets
 */
@Component({
  selector: 'pharos-tchem-summary',
  templateUrl: './tchem-summary.component.html',
  styleUrls: ['./tchem-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @Input() apiSources: any[];
  /**
   * no args constructor
   */
  constructor() {
  }

  getTooltip(label: string): string {
    if (this.apiSources) {
      const tooltip = this.apiSources.filter(source => source.field === label);
      if (tooltip.length) {
        return tooltip[0].description;
      } else {
        return null;
      }
    }
  }
}
