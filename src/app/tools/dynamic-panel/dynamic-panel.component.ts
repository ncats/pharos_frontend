import {Component, Input} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavSectionsService} from "../sidenav-panel/services/nav-sections.service";

/**
 * Base component to be expanded by dynamically injected panels
 * this contains boilerplate functionality to get and set data using a behavior subject
 * subscription needs to be set in the extending component, where other logic can take place
 */
@Component({
  template: ''
})
export class DynamicPanelComponent {
  /**
   * check to see if mobile or small screen
   * @type {boolean}
   */
  isSmallScreen = false;
  /**
   * loading boolean flag
   * @type {boolean}
   */
  @Input() loading = true;
  navSectionsService: NavSectionsService;
  loadingComplete(){
    this.loading = false;
    this.navSectionsService.reScroll();
  }
  loadingStart() {
    this.loading = true;
  }
  /**
   * main field name
   */
  field: string;

  /**
   * readable label for field
   */
  label: string;

  /**
   * description of the panel
   */
  description: string;

  /**
   * api sources, mainly used for the definitions
   */
  apiSources: any[];
  mainSource: string;
  etag?: string;
  sideway?: string[];

  // todo: check to make sure all extending components are using this subject
  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

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
    if (value.data) {
      this._data.next(value.data);
    } else {
      this._data.next(value);
    }
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  /**
   * No dependencies
   *
   */
  constructor(navSectionsService: NavSectionsService) {
    this.navSectionsService = navSectionsService;
  }

  getTooltip(label: string): string {
    const tooltip = this.apiSources.filter(source => source.field === label);
    if (tooltip.length) {
      return tooltip[0].description;
    } else {
      return null;
    }
  }
}
