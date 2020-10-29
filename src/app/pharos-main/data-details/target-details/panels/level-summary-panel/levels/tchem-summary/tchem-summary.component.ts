import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

/**
 * shows details about tchem targets
 */
@Component({
  selector: 'pharos-tchem-summary',
  templateUrl: './tchem-summary.component.html',
  styleUrls: ['./tchem-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TchemSummaryComponent extends DynamicPanelBaseComponent{
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
  constructor() {
    super();
  }
}
