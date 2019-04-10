import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class NavSectionsService {

  constructor() { }

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _sections: any[] = [];

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _navSectionsSource = new BehaviorSubject<any[]>(null);

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _activeSection: string;

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _activeSectionSource = new BehaviorSubject<string>('summary');

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  sections$ = this._navSectionsSource.asObservable();

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  activeSection$ = this._activeSectionSource.asObservable();

  setSections(sections: any[]): void {
    this._navSectionsSource.next(sections);
  }

  setActiveSection(section: string) {
    this._activeSectionSource.next(section);
  }
}
