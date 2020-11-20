import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";
import {ViewportScroller, Location} from "@angular/common";
import {NavSectionsService} from "../../../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * shows details about tdark targets
 */
@Component({
  selector: 'pharos-tdark-summary',
  templateUrl: './tdark-summary.component.html',
  styleUrls: ['../tdl-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TdarkSummaryComponent extends DynamicPanelBaseComponent{
  /**
   * input target
   */
  @Input() target: Target;

  scroll(section: string, tab: string){
    this.navSectionsService.setActiveTab(section, tab);
  }

  /**
   * no args constructor
   */
  constructor(private location: Location,
              private viewportScroller: ViewportScroller,
              private navSectionsService: NavSectionsService) {
    super();
  }
}
