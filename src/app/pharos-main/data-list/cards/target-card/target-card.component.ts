import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../config/pharos-config';
import {Target} from '../../../../models/target';

/**
 * component to display a consolidated target view
 */
@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss']
})
export class TargetCardComponent implements OnInit, OnChanges {
  /**
   * target to display. optional because it may also get injected
   */
  @Input() target?: Target;

  /**
   * boolean to display knowedge chart under radar chart
   * @type {boolean}
   */
  @Input() showKnowledge = false;

  /**
   * api url to fetch target data for the radar chart
   */
  _apiUrl: string;

  /**
   * radar chart data
   */
  knowledge: any;

  /**
   * set up http calls to fetch radar chart data
   * @param {HttpClient} http
   * @param {ChangeDetectorRef} ref
   * @param {PharosConfig} pharosConfig
   */
  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private pharosConfig: PharosConfig) {
    this._apiUrl = this.pharosConfig.getRadarPath();

  }

  /**
   * if target exists, fetch radar chart data
   */
  ngOnInit() {
    if (this.target) {
      this.http.get(`${this._apiUrl}${this.target.accession}`).subscribe( res => {
        this.knowledge = res;
        this.ref.markForCheck();
      });
    }
  }

  /**
   * this handles if a target is passed in after init
   * @param changes
   */
  ngOnChanges(changes) {
    if (!changes.target.firstChange) {
      this.http.get(`${this._apiUrl}${this.target.accession}`).subscribe( res => this.knowledge = res);
    }
  }
}
