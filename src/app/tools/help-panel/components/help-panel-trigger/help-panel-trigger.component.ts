import {Component, Input, OnInit} from '@angular/core';
import {HelpPanelOpenerService} from '../../services/help-panel-opener.service';
import {HelpDataService} from '../../services/help-data.service';
import {DataVersionInfo} from "../../../../models/dataVersion";

/**
 * button to pass help panel toggle info
 */
@Component({
  selector: 'pharos-help-panel-trigger',
  templateUrl: './help-panel-trigger.component.html',
  styleUrls: ['./help-panel-trigger.component.css']
})
export class HelpPanelTriggerComponent {
  /**
   * original panel/data source that called the help panel
   */
  @Input() origin?: string;

  /**
   * readable label for the data source
   */
  @Input() label?: string;
  @Input() dataVersions?: DataVersionInfo[];

  /**
   * set up toggle with required services
   * @param helpPanelOpenerService
   * @param helpDataService
   */
  constructor(
    private helpPanelOpenerService: HelpPanelOpenerService,
    private helpDataService: HelpDataService
  ) { }

  /**
   * sets data origin and opens help panel
   */
  toggle() {
    if (this.origin) {
      this.helpDataService.setOrigin(this.origin);
    }
    if (this.dataVersions && this.dataVersions.length > 0) {
      this.helpDataService.setVersions(this.dataVersions);
    } else {
      this.helpDataService.setVersions([]);
    }
    this.helpPanelOpenerService.toggleVisible();
  }
}
