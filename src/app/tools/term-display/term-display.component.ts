import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {Property} from '../../models/property';

@Component({
  selector: 'pharos-term-display',
  templateUrl: './term-display.component.html',
  styleUrls: ['./term-display.component.css']
})

/**
 * reusable generic component to display pharos information. uses getter and setter for values, and html
 * will be expanded with templates for router links and external links.
 */
export class TermDisplayComponent implements OnInit {
  @Input() showLabel = true;

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<Property>(null);

  // change data to use getter and setter
  @Input()
  set term(value: Property) {
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
