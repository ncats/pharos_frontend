import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {takeWhile} from "rxjs/operators";

@Component({
  templateUrl: './dynamic-panel.component.html',
  styleUrls: ['./dynamic-panel.component.css']
})
export class DynamicPanelComponent {
  // initialize a private variable _data, it's a BehaviorSubject
  protected _data = new BehaviorSubject<any>({});

  // change data to use getter and setter
  @Input()
  set data(value: any) {
    // set the latest value for _data BehaviorSubject
      this._data.next(value);
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  constructor (){}

}
