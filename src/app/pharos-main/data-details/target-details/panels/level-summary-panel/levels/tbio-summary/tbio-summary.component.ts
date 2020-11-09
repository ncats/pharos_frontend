import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

/**
 * shows details about tbio targets
 */
@Component({
  selector: 'pharos-tbio-summary',
  templateUrl: './tbio-summary.component.html',
  styleUrls: ['./tbio-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TbioSummaryComponent extends DynamicPanelBaseComponent{
  /**
   * input target
   */
  @Input() target: Target;

  /**
   * no args constructor
   */
  constructor() {
    super();
  }
}
