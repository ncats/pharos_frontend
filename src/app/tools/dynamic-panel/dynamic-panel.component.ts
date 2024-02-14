import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DynamicPanelBaseComponent} from '../dynamic-panel-base/dynamic-panel-base.component';
import {DynamicServicesService} from '../../pharos-services/dynamic-services.service';

/**
 * Base component to be expanded by dynamically injected panels
 * this contains boilerplate functionality to get and set data using a behavior subject
 * subscription needs to be set in the extending component, where other logic can take place
 */
@Component({
  standalone: true,
  template: ''
})
export class DynamicPanelComponent extends DynamicPanelBaseComponent {
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

  mainSource: string;
  etag?: string;
  sideway?: string[];

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

  loadingComplete(scroll = true){
    this.loading = false;
    if (scroll) {
      setTimeout(() => {
        if (this.dynamicServices.route.snapshot.fragment) {
          this.dynamicServices.viewportScroller.scrollToAnchor(this.dynamicServices.route.snapshot.fragment);
        }
      }, 0);
    }
  }
  loadingStart() {
    this.loading = true;
  }

  /**
   * No dependencies
   *
   */
  constructor(public dynamicServices: DynamicServicesService) {
    super();
  }

  /**
   * set active section
   * @param {string} fragment
   */
  active(fragment: string) {
    this.dynamicServices.navSectionsService.setActiveSection(fragment);
  }

  hideSection() {
    this.dynamicServices.navSectionsService.hideSection(this.field);
  }

  showSection(){
    this.dynamicServices.navSectionsService.showSection(this.field);
  }
}
