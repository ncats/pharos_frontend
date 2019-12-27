import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelComponent} from '../../../../../../../tools/dynamic-panel/dynamic-panel.component';

/**
 * shows details about tdark targets
 */
@Component({
  selector: 'pharos-tdark-summary',
  templateUrl: './tdark-summary.component.html',
  styleUrls: ['./tdark-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TdarkSummaryComponent {
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
