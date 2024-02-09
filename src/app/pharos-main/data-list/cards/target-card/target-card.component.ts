import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DataProperty} from "../../../../tools/generic-table/components/property-display/data-property";
import {DynamicPanelBaseComponent} from "../../../../tools/dynamic-panel-base/dynamic-panel-base.component";
import {IdgLevelIndicatorComponent} from '../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {RadarChartComponent} from '../../../../tools/visualizations/radar-chart/radar-chart.component';
import {
  PropertyDisplayComponent
} from '../../../../tools/generic-table/components/property-display/property-display.component';
import {MatCardModule} from '@angular/material/card';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDivider} from '@angular/material/divider';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * component to display a consolidated target view
 */
@Component({
  standalone: true,
  imports: [
      CommonModule,
    MatCardModule,
      FlexLayoutModule,
    IdgLevelIndicatorComponent,
    RadarChartComponent,
    PropertyDisplayComponent,
    MatTooltip,
    MatDivider
  ],
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetCardComponent extends DynamicPanelBaseComponent implements OnInit {
  /**
   * target to display. optional because it may also get injected
   */
  @Input() target?: Target;

  /**
   * boolean to display knowedge chart under radar chart
   * @type {boolean}
   */
  @Input() showKnowledge = false;

  constructor() {
    super();
  }

  /**
   * if target exists, fetch radar chart data
   */
  ngOnInit() {
    // todo add harmonizome serializer or find out why mapped list data in the resolver doesn't work
    if (this.target.hgdata) {
      const data = this.target.hgdata as any;
      if (data.summary) {
        this.target.hgdata = data.summary;
      }
    }
  }

  getDisplayProp(prop: DataProperty){
    prop.tooltip = this.getTooltip(prop.label);
    return prop
  }
}
