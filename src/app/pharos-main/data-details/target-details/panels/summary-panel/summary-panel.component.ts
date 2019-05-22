import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatDialog} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {RadarChartViewerComponent} from '../../../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {Target} from '../../../../../models/target';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {HelpDataService} from "../../../../../tools/help-panel/services/help-data.service";


/**
 * displays basic summary info about a target
 * also contains radar chart knowledge graph and knowledge table if available
 */
@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})

/**
 * summary panel class
 */
export class SummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  /**
   * target displayed
   */
  @Input() target: Target;

  /**
   * dialog for radar modal and navigation sections service
   * @param {MatDialog} dialog
   * @param {NavSectionsService} navSectionsService
   * @param {HelpDataService} helpService
   */
  constructor(
    public dialog: MatDialog,
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  /**
   * fetch all of the data - most is directly displayed, so no setter function needed
   */
  ngOnInit() {
  this._data
  // listen to data as long as term is undefined or null
  // Unsubscribe once term has value
    .pipe(
      // todo: this unsubscribe doesn't seem to work
      takeUntil(this.ngUnsubscribe),
    )
    .subscribe(x => {
      if (Object.values(this.data).length > 0) {
        this.ngUnsubscribe.next();
      }
    });
}

  /**
   * open modal to display larger radar chart
   */
  openModal(): void {
  const dialogRef = this.dialog.open(RadarChartViewerComponent, {
    height: '90vh',
    width: '85vw',
    data: { data: this.data.knowledge,
            id: this.data.knowledge[0].className,
      target: this.target,
      size: 'large'}
  });
}

  /**
   * tracks if element is active in view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
}

  getTooltip(label: string): string {
    return this.apiSources.filter(source => source.label === label)[0].description;
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
