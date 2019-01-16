import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {RadarService} from "../visualizations/radar-chart/radar.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Property} from "../../models/property";

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

  sources: Map<string, any> = new Map<string, any>();

  fieldSources: any;

  constructor(private radarDataService: RadarService,
              @Optional() @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    if (this.modalData) {
      Object.keys(this.modalData).forEach(key => this[key] = this.modalData[key]);
      console.log(this);
    }
      if (this.data) {
        console.log(this);
        this.radarDataService.getData(this.id, 'knowledge-sources').subscribe(res => {
          console.log(res);
          if(res.sources) {
            res.sources.forEach(source => this.sources.set(source.value, source.ds))
          } else {
            res.forEach(source => this.sources.set(source.value, source.ds))
          }
          console.log(res);
          this.radarDataService.setData(this.id, {className: this.id, sources: res}, 'knowledge-sources')
        });
      }
  }

  getSource(event: any) {
      this.fieldSources = [];
      console.log(this);
      console.log(event);
      this.sources.get(event.axis).forEach(source => {
      console.log(source);
      const ret = new Property({term: source.ds_name, externalHref: source.ds_url});
      this.fieldSources.push(ret);
    });
      console.log(this.fieldSources);
  }
}
