import {Component, Input, OnInit} from '@angular/core';
import {Term} from '../../models/term';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'pharos-term-display',
  templateUrl: './term-display.component.html',
  styleUrls: ['./term-display.component.css']
})
export class TermDisplayComponent implements OnInit {
  @Input() showLabel = true;
  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Term>(null);

  // change data to use getter and setter
  @Input()
  set term(value: Term) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get term() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  ngOnInit() {
    // now we can subscribe to it
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeWhile(() => !this.term)
      )
      .subscribe(x => x);
  }
}
