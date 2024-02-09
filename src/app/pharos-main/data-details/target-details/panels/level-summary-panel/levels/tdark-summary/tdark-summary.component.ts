import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../../../models/target';
import {DynamicPanelBaseComponent} from "../../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";
import {NavSectionsService} from "../../../../../../../tools/sidenav-panel/services/nav-sections.service";
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

/**
 * shows details about tdark targets
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatIcon, MatTooltip],
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
  constructor(private navSectionsService: NavSectionsService) {
    super();
  }
}
