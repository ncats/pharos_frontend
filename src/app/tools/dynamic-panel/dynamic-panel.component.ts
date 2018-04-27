import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Base component to be expanded by dynamically injected panels
 * this contains boilerplate functionality to get and set data using a behavior subject
 * subscription needs to be set in the extending component, where other logic can take place
 */
@Component({
  templateUrl: './dynamic-panel.component.html',
  styleUrls: ['./dynamic-panel.component.css']
})
export class DynamicPanelComponent {
  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _data = new BehaviorSubject<any>({});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
      this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  /** No dependencies */
  constructor () {}

}
