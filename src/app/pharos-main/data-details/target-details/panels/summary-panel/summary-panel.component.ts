import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Term} from '../../../../../models/term';
import {HttpClient} from '@angular/common/http';
import {Value} from '../../../../../models/value';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {RadarChartComponent} from "../../../../../tools/radar-chart/radar-chart.component";
import {MatDialog} from "@angular/material";


@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  loaded = false;
  @Input() width = 30;
  synonyms: Term[];
  symbol: Term[];
  gene: Term[];
  pubmed: Value;
  timelines: any[] = [];
  radarOptions: any;

  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716 https://github.com/angular/angular/issues/8785
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

// todo: remove these http calls after api is fixed
  constructor(
    private _http: HttpClient,
    public dialog: MatDialog
  ) {
    super();
  }

ngOnInit() {
  this._data
  // listen to data as long as term is undefined or null
  // Unsubscribe once term has value
    .pipe(
      // todo: this unsubscribe doesn't seem to work
      //    takeWhile(() => !this.data['references'])
    )
    .subscribe(x => {
      if (this.data.timelines) {
        this.fetchTimelineData();
      }
    });
}


getTimeline(field: string): any {
  return this.timelines.filter(tl => tl.name === field);
}

fetchTimelineData(): void {
  this.data.timelines.forEach(timeline => {
    if (timeline.href) {
      this._http.get<any>(timeline.href).subscribe(res => {
        this.timelines.push(res);
        this.timelines = this.timelines.filter((tl, index, arr) =>
          index === arr.findIndex((t) => (
            t.id === tl.id
          ))
        );
      });
    }
  });
}

openModal(): void {
  let dialogRef = this.dialog.open(RadarChartComponent, {
    height: '95vh',
    width: '85vw',
    data: { data: this.data.knowledge,
            id: this.data.knowledge[0].className,
      size: 'large'}
  });
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
