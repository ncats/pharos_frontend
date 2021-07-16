import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {DataProperty} from '../generic-table/components/property-display/data-property';
import {BehaviorSubject} from 'rxjs/index';

/**
 * service to pass a hovered tissue string from any component to a anatamagram component
 * not injected in root
 */
@Injectable({
  providedIn: 'root'
})
export class AnatamogramHoverService {

  /**
   * RXJS Subject to pass value changes
   * @type {Subject<string>}
   * @private
   */
  private _tissueSource = new Subject<string>();

  /**
   * observable source for subscriptions
   * @type {Observable<string>}
   */
  tissues$ = this._tissueSource.asObservable();

  /**
   * method to update hovered tissue
   * @param {string} tissue
   */
  setTissue(tissue?: string) {
    this._tissueSource.next(tissue);
  }
}


