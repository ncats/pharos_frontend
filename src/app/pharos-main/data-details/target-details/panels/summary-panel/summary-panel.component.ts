import {Component, HostBinding, Input, OnInit, SimpleChange, ViewEncapsulation} from '@angular/core';
import {finalize, map, takeUntil, takeWhile} from "rxjs/operators";
import {Term} from "../../../../../models/term";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent implements OnInit {
  loaded = false;
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() width: number = 30;

  timelines = [];

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<any>(null);

// change data to use getter and setter
  @Input()
  set data(value: any) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
    this.loaded = true;
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }
  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

// todo: remove these http calls after api is fixed
  constructor(private _http: HttpClient) { }
ngOnInit() {
  // now we can subscribe to it
  this._data
    .pipe(
      finalize( () => {
        console.log("finally");
        console.log(this);
        }
      )
    )
    .subscribe(parentData => {
      // todo: this is terrible kill it with fire asap
      if(parentData && parentData.timelines ) {
        if (this.timelines.length < parentData.timelines.length) {
          parentData.timelines.forEach(timeline => {
            if (timeline.href) {
              this._http.get<any>(timeline.href).subscribe(res => {
                this.timelines.push({[res.name]: res});
                this.timelines = Array.from(new Set(this.timelines));
              })
            }
          })
        }
      }
      this.mapData();
      return parentData;
    });
  console.log(this);
}

mapData() {
   // console.log(this.timelines);
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
