import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {RadarService} from '../visualizations/radar-chart/radar.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {PharosProperty} from '../../models/pharos-property';

/**
 * radar chart modal viewer has the radar chart and sources list
 */
@Component({
  selector: 'pharos-radar-chart-viewer',
  templateUrl: './radar-chart-viewer.component.html',
  styleUrls: ['./radar-chart-viewer.component.scss']
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
    console.log(value);
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
  @Input() target?: string;

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
   * @param {RadarService} radarDataService
   * @param modalData
   */
  constructor(private radarDataService: RadarService,
              @Optional() @Inject(MAT_DIALOG_DATA) public modalData: any) {
  }

  /**
   * load modal data and retrieve knowledge sources
   */
  ngOnInit() {
    if (this.modalData) {
      Object.keys(this.modalData).forEach(key => this[key] = this.modalData[key]);
    }
    if (this.data) {
      this.radarDataService.getData(this.id, 'knowledge-sources').subscribe(res => {
        if (res.sources) {
          res.sources.forEach(source => this.sources.set(source.value, source.ds));
        } else {
          res.forEach(source => this.sources.set(source.value, source.ds));
        }
        this.radarDataService.setData(this.id, {className: this.id, sources: res}, 'knowledge-sources');
      });
    }
  }

  /**
   * get sources for an axis
   * @param event
   */
  getSource(event: any) {
    this.fieldSources = [];
    this.axis = event.axis;
    const src = this.sources.get(this.axis);
    if (src) {
      src.forEach(source => {
        const ret = new PharosProperty({term: source.ds_name, externalLink: source.ds_url});
        this.fieldSources.push(ret);
      });
    }
  }
}
