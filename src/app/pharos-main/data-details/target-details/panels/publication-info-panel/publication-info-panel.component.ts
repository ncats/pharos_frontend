import { Component, OnInit } from '@angular/core';
import {from} from "rxjs/index";
import {takeUntil, zipAll} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {PageData} from "../../../../../models/page-data";
import {HttpClient} from "@angular/common/http";
import {PharosPoint} from "../../../../../tools/visualizations/line-chart/line-chart.component";

@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss']
})
export class PublicationInfoPanelComponent extends DynamicPanelComponent implements OnInit {
  target: Target;
  references: any[];
  generif: any[];
  targetPageData: PageData;  timelines: any[] = [];
  tlMap: Map<string, any> = new Map<string, any>();


  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
            if (Object.values(this.data).length > 0) {
              this.ngUnsubscribe.next();
              this.setterFunction();
            }
      });
  }

  setterFunction() {
    this.references = this.data.references;
    this.generif = this.data.generif;
    this.fetchTimelineData();
  }


  getTimeline(field: string): any {
    return this.tlMap.get(field);
  }

  fetchTimelineData(): void {
    this.data.timelines.forEach(timeline => {
      if (timeline.href && !this.tlMap.get(timeline.id)) {
        this._http.get<any>(timeline.href).subscribe(res => {
          const data: PharosPoint[] = [];
          res.events.forEach(point => {
            if (point.properties) {
              const val = point.properties.filter(prop => prop.label === 'Score');
              if (val.length > 0) {
                const pt: PharosPoint = {key: point.start, value: val[0].numval};
                data.push(pt);
              } else {
                const pt: PharosPoint = {key: point.start, value: point.end};
                data.push(pt);
              }
            }
          });
          this.tlMap.set(timeline.id, data);
          this.tlMap.set(res.name, data);
          this.loading = false;
        });
      }
    });
    ['PubMed Score', 'PubTator', 'Patent Count'].forEach(name => {
      const tl = this.tlMap.get(name);
      if (tl) {
        this.timelines.push(tl);
      }
    });
    this.timelines = this.timelines.filter((tl, index, arr) =>
      index === arr.findIndex(t => t.id === tl.id)
    );
  }

  raisePubtator() {
    if (this.target) {
      return Math.pow(10, this.target.pubTatorScore).toFixed(2);
    }
  }



}
