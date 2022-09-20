import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class NavSectionsService {

  /**
   * no args constructor
   */
  constructor(@Inject(PLATFORM_ID) private platformID: any) { }

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
    this._allSections = sections;
    this._allSections.forEach(sec => {
      if (sec.navHeader) {
        sec.visible = isPlatformBrowser(this.platformID) || !sec.browserOnly;
      }
      sec.panels?.forEach(subsec => {
        if (subsec.navHeader) {
          subsec.visible = isPlatformBrowser(this.platformID) || !subsec.browserOnly;
        }
      });
    })
    this._navSectionsSource.next(this._allSections);
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
    this.updateVisibility(remSection, false);
    this._navSectionsSource.next(this._allSections);
  }

  showSection(addSection: string) {
    this.updateVisibility(addSection, true);
    this._navSectionsSource.next(this._allSections);
  }

  updateVisibility(section: string, show: boolean) {
    this._allSections.forEach(sec => {
      if (sec.navHeader?.section === section) {
        sec.visible = show;
      } else {
        sec.panels?.forEach(subsec => {
          if (subsec.navHeader?.section === section) {
            subsec.visible = show;
          }
        })
      }
    });
  }
}
