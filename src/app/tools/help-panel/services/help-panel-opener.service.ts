import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class HelpPanelOpenerService {

  constructor() { }

  /**
   * RxJs subject to broadcast help panel visibility changes
   * @type {Subject<boolean>}
   * @private
   */
  private _sidenavStatusSource = new BehaviorSubject<boolean>(false);

  /**
   * Observable stream of help panel visibility changes
   * @type {Observable<boolean>}
   */
  toggle$ = this._sidenavStatusSource.asObservable();

  /**
   * change visibility of help panel
   */
  toggleVisible() {
    this._sidenavStatusSource.next(true);
  }
}
