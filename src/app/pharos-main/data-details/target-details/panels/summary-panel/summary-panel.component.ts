import {Component, HostBinding, Input, OnDestroy, OnInit, SimpleChange, ViewEncapsulation} from '@angular/core';
import {finalize, map, takeUntil, takeWhile} from 'rxjs/operators';
import {Term} from '../../../../../models/term';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Value} from '../../../../../models/value';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";

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
  constructor(private _http: HttpClient) {
    super();
  }

ngOnInit() {
    console.log(this);
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
  this.radarOptions = {
    w: 290,
    h: 350,
   // margin: margin,
    maxValue: 1,
    levels: 6,
    roundStrokes: false,
   // color: d3.scaleOrdinal().range(["#AFC52F", "#ff6600"]),
    format: '.0f',
    legend: { title: 'Organization XYZ', translateX: 100, translateY: 40 },
    unit: '$'
  };

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


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
