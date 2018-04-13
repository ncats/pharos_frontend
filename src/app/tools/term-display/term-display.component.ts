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
 // @Input() term: Term;

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Term>(null);

  // change data to use getter and setter
  @Input()
  set term(value: Term) {
    console.log(value);
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get term() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  ngOnInit() {
    // now we can subscribe to it, whenever input changes,
    // we will run our grouping logic
    this._data
    // add this line
    // listen to data as long as groupPosts is undefined or null
    // Unsubscribe once groupPosts has value
      .pipe(
        takeWhile(() => !this.term)
      )
      .subscribe(x => {
        console.log(x);

     //   this.groupPosts = this.groupByCategory(this.data);
      });
  }
}
