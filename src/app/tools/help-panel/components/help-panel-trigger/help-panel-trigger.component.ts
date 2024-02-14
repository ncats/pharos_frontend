import {Component, Input, ViewEncapsulation} from '@angular/core';
import {HelpPanelOpenerService} from '../../services/help-panel-opener.service';
import {HelpDataService} from '../../services/help-data.service';
import {DataVersionInfo} from '../../../../models/dataVersion';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HelpPanelComponent} from '../../help-panel.component';

/**
 * button to pass help panel toggle info
 */
@Component({
  standalone: true,
  imports: [MatTooltip, MatButtonModule, MatIconModule, HelpPanelComponent],
  selector: 'pharos-help-panel-trigger',
  templateUrl: './help-panel-trigger.component.html',
  styleUrls: ['./help-panel-trigger.component.scss']
})
export class HelpPanelTriggerComponent {
  /**
   * original panel/data source that called the help panel
   */
  @Input() origin?: string;
  @Input() predictionDetails: any[] = [];

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
    this.helpDataService.predictionDetails = this.predictionDetails;
    this.helpDataService.setOrigin(this.origin);
    if (this.dataVersions && this.dataVersions.length > 0) {
      this.helpDataService.setVersions(this.dataVersions);
    } else {
      this.helpDataService.setVersions([]);
    }
    this.helpPanelOpenerService.toggleVisible();
  }
}
