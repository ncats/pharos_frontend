import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Target} from '../../models/target';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  TargetHeaderComponent
} from '../../pharos-main/data-details/target-details/target-header/target-header.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PropertyDisplayComponent} from '../generic-table/components/property-display/property-display.component';
import {RadarChartComponent} from '../visualizations/radar-chart/radar-chart.component';

/**
 * radar chart modal viewer has the radar chart and sources list
 */
@Component({
  standalone: true,
  imports: [
    CommonModule, FlexLayoutModule, TargetHeaderComponent, PropertyDisplayComponent, RadarChartComponent
  ],
  selector: 'pharos-radar-chart-viewer',
  templateUrl: './radar-chart-viewer.component.html',
  styleUrls: ['./radar-chart-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadarChartViewerComponent implements OnInit {
  /**
   * optional id that is passed in to retrieve the chart data
   */
  @Input() id: any;

  /**
   * behavior subject that is used to get and set chart data
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * setter for chart data
   * @param value
   */
  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  /**
   * getter for chart data
   * @returns {any}
   */
  get data(): any {
    return this._data.value;
  }

  /**
   * optional size parameter, used to retrieve a config object from the radar service
   */
  @Input() size?: string;

  /**
   * optional target parameter, used to display target name and idg level
   */
  @Input() target?: Target;

  /**
   * all data sources for the radar chart
   * @type {Map<string, any>}
   */
  sources: Map<string, any> = new Map<string, any>();

  /**
   * specific field sources to display on hoverover
   */
  fieldSources: any;

  /**
   * label for sources viewer
   */
  axis: string;

  /**
   * radar service and optional modal data
   * @param modalData
   */
  constructor(private changeRef: ChangeDetectorRef,
              @Optional() @Inject(MAT_DIALOG_DATA) public modalData: any) {
  }

  /**
   * load modal data and retrieve knowledge sources
   */
  ngOnInit() {
    if (this.modalData) {
      Object.keys(this.modalData).forEach(key => this[key] = this.modalData[key]);
      this.changeRef.detectChanges();
    }
  }

  /**
   * get sources for an axis
   * @param event
   */
  getSource(event: any) {
    this.axis = event.name;
    this.fieldSources = [];
    const hData = this.target.hgdata.find(hAxis => hAxis.name === event.name);
    if (hData && hData.sources){
      hData.sources.forEach(nameUrlPair => {
        const pieces = nameUrlPair.split('!');
        this.fieldSources.push({
          term: pieces[0],
          externalLink: pieces[1]
        });
      });
    }
  }
}
