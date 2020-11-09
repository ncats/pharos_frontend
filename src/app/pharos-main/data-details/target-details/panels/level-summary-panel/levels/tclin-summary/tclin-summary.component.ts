import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

/**
 * shows details about tclin targets
 */
@Component({
  selector: 'pharos-tclin-summary',
  templateUrl: './tclin-summary.component.html',
  styleUrls: ['./tclin-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TclinSummaryComponent extends DynamicPanelBaseComponent{
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
