import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import { MatDialog } from '@angular/material/dialog';
import {RadarChartViewerComponent} from '../../../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {Target} from '../../../../../models/target';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {takeUntil} from 'rxjs/operators';


/**
 * displays basic summary info about a target
 * also contains radar chart knowledge graph and knowledge table if available
 */
@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * summary panel class
 */
export class SummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * target displayed
   */
  @Input() target: Target;

  @Input() targetProps: any;

  affiliates: string[] = ["Dark Kinase Knowledgebase"];
  affiliateLinks: any[] = [];
  /**
   * dialog for radar modal and navigation sections service
   * @param {MatDialog} dialog
   * @param changeRef
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    public dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }

  /**
   * fetch all of the data - most is directly displayed, so no setter function needed
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.affiliateLinks = [];
        for(let i = 0 ; i < this.affiliates.length ; i++){
          if(this.target.dataSources.includes(this.affiliates[i])){
            this.affiliateLinks.push(this.affiliates[i]);
          }
        }
        this.targetProps = this.data.targetsProps;
        this.loadingComplete();
        this.changeRef.markForCheck();
      });
}

  /**
   * open modal to display larger radar chart
   */
  openModal(): void {
  const dialogRef = this.dialog.open(RadarChartViewerComponent, {
    height: '90vh',
    width: '85vw',
    data: { data: [this.target.hgdata],
            id: this.target.accession,
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
    const tooltip = this.apiSources.filter(source => source.field === label);
    if (tooltip.length) {
      return tooltip[0].description;
    } else {
      return null;
    }  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
