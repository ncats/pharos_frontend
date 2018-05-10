import {Component, HostBinding, Input, OnDestroy, OnInit, SimpleChange, ViewEncapsulation} from '@angular/core';
import {finalize, map, takeUntil, takeWhile} from 'rxjs/operators';
import {Term} from '../../../../../models/term';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Value} from '../../../../../models/value';

@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent implements OnInit, OnDestroy {
  loaded = false;
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() width = 30;
  synonyms: Term[];
  symbol: Term[];
  gene: Term[];
  pubmed: Value;
  timelines: any[] = [];

 // @Input() data: any;
  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<any>(null);

// change data to use getter and setter
  @Input()
  set data(value: any) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
    if (value.timelines) {
      this.fetchTimelineData();
    }
    this.loaded = true;
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }
  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716 https://github.com/angular/angular/issues/8785
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

// todo: remove these http calls after api is fixed
  constructor(private _http: HttpClient) { }
ngOnInit() {
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
