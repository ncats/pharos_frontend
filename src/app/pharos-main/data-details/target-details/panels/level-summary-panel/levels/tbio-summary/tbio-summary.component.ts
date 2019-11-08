import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';

/**
 * shows details about tbio targets
 */
@Component({
  selector: 'pharos-tbio-summary',
  templateUrl: './tbio-summary.component.html',
  styleUrls: ['./tbio-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TbioSummaryComponent {
  /**
   * input target
   */
  @Input() target: Target;

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
