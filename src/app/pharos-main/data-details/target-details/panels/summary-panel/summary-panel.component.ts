import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {RadarChartViewerComponent} from '../../../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {MatCardModule} from '@angular/material/card';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {MatTooltip} from '@angular/material/tooltip';
import {GeneSummaryComponent} from '../gene-summary/gene-summary.component';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {KnowledgeTableComponent} from '../../../../../tools/knowledge-table/knowledge-table.component';
import {MatIcon} from '@angular/material/icon';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  HelpPanelTriggerComponent
} from '../../../../../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';


/**
 * displays basic summary info about a target
 * also contains radar chart knowledge graph and knowledge table if available
 */
@Component({
  standalone: true,
  imports: [CommonModule, ScrollspyDirective, ComponentHeaderComponent, MatCardModule, FlexLayoutModule, MatIcon,
    PropertyDisplayComponent, MatTooltip, GeneSummaryComponent, RadarChartComponent, KnowledgeTableComponent, CommonToolsModule],
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

  /**
   * dialog for radar modal and navigation sections service
   * @param {MatDialog} dialog
   * @param changeRef
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    public dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * fetch all of the data - most is directly displayed, so no setter function needed
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.target = this.data.targets;
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
}
