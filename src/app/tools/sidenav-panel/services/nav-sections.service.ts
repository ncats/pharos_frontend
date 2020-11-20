import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})

export class NavSectionsService {

  /**
   * no args constructor
   */
  constructor() { }

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _visibleSections: any[] = [];
  private _allSections: any[] = [];

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _navSectionsSource = new BehaviorSubject<any[]>(null);

  private _activeTabSource = new BehaviorSubject<string>('relatedPublications');
  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _activeSection: string;
  private _activeTab: string;
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

  activeTab$ = this._activeTabSource.asObservable();

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  activeSection$ = this._activeSectionSource.asObservable();

  setSections(sections: any[]): void {
    this._visibleSections = sections;
    this._allSections = sections;
    this._navSectionsSource.next(this._visibleSections);
  }

  setActiveTab(section: string, tab?: string): void {
    this._activeTab = tab;
    this._activeTabSource.next(tab || section);
    this.setActiveSection(section);
  }

  setActiveSection(section: string) {
    this._activeSectionSource.next(section);
  }

  hideSection(remSection: string) {
    this._visibleSections = this._visibleSections.filter(section => section.section !== remSection);
    this._navSectionsSource.next(this._visibleSections);
  }

  showSection(addSection: string){
    this._visibleSections = this._allSections.filter(section => {
      return section.section === addSection || this._visibleSections.includes(section);
    });
    this._navSectionsSource.next(this._visibleSections);
  }
}
