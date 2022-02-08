import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {PharosProperty} from '../../models/pharos-property';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * UI component to display the idg level of a target using Material Design chip
 */
@Component({
  selector: 'pharos-idg-level-indicator',
  templateUrl: './idg-level-indicator.component.html',
  styleUrls: ['./idg-level-indicator.component.scss'],
})
export class IdgLevelIndicatorComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  /**
   * String to be displayed background level correlates to level and is set in parent scss file
   */
  @Input() level: string;

  /**
   * grey out the indicator
   */
  @Input() disabled = false;

  /**
   *  initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<PharosProperty>(null);

  /**
   * setter for idg target level property
   * @param value
   */
  @Input()
  set data(value: PharosProperty) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  /**
   * getter for idg level property
   */
  get data(): PharosProperty {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }


  /**
   * no args
   */
  constructor() {
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    this._data
      .pipe(takeUntil(this.ngUnsubscribe))  // FUCK
      .subscribe(res => {
      if (res) {
        this.level = res.term as string;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
