import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";
import {NavSectionsService} from "../../../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * shows details about tbio targets
 */
@Component({
  selector: 'pharos-tbio-summary',
  templateUrl: './tbio-summary.component.html',
  styleUrls: ['../tdl-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TbioSummaryComponent extends DynamicPanelBaseComponent {
  /**
   * input target
   */
  @Input() target: Target;

  scroll(section: string){
    this.navSectionsService.setActiveTab(section);
  }
  /**
   * no args constructor
   */
  constructor(private navSectionsService: NavSectionsService) {
    super();
  }
}
