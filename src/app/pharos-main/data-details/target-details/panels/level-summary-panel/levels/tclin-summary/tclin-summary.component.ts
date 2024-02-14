import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from '../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component';
import {Facet} from '../../../../../../../models/facet';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';

/**
 * shows details about tclin targets
 */
@Component({
  standalone: true,
  imports: [FlexLayoutModule, CommonModule, MatCardModule, MatIcon, MatTooltip, RouterModule],
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
