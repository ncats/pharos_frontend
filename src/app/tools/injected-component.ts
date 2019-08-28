import {PharosBase} from '../models/pharos-base';
import {EventEmitter} from '@angular/core';

/**
 * expandable interface, mainly for the generic table
 * contains several properties that are used by the generic table when a component is injected
 */
export interface InjectedComponent {
  /**
   * arbitrary data object passed to the component
   */
  data: any;
  /**
   * Initial object row in the table, ie: target, disease, etc
   * primarily target display object
   */
  object: PharosBase;

  /**
   * parent object, could also be target, disease
   */
  parent?: PharosBase;

  /**
   * the DOM container that the component is injected into
   * pretty much a table cell
   */
  container: any;

  /**
   * event emitter for when the injected component is clicked on
   */
  clickEvent: EventEmitter<any>;

  /**
   * tracks when the component is injected
   */
  attached: boolean;
}
