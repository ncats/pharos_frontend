import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from "../../../../../../config/pharos-config";

@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.css']
})
export class TargetCardComponent implements OnInit, OnChanges {
  @Input() target?: Target;
  @Input() showKnowledge = false;
  _apiUrl: string;
  knowledge: any;

  constructor(private http: HttpClient,
              private pharosConfig: PharosConfig) {
    this._apiUrl = this.pharosConfig.getRadarPath();

  }

  ngOnInit() {
    if (this.target) {
      this.http.get(`${this._apiUrl}${this.target.accession}`).subscribe( res => this.knowledge = res);
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
