import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";
import {Facet} from "../../../../../../../models/facet";

/**
 * shows details about tclin targets
 */
@Component({
  selector: 'pharos-tclin-summary',
  templateUrl: './tclin-summary.component.html',
  styleUrls: ['../tdl-summary.component.scss'],
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
   * reference to Facet class for use in the html
   */
  Facet = Facet;

  /**
   * no args constructor
   */
  constructor() {
    super();
  }
}
