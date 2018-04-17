import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {Term} from "../../../../../models/term";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent implements OnInit {
  data: any = {};

 // width: number = 30;

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<number>(30);

  // change data to use getter and setter
  @Input()
  set width(value: number) {
    console.log(value);
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get width() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

  constructor() { }
  ngOnInit() {
    // now we can subscribe to it
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeWhile(() => !this.width)
      )
      .subscribe(x => x);
  }

}
