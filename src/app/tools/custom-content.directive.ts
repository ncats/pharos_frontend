import {Directive, ViewContainerRef} from '@angular/core';

/**
 * Directive to return a view container reference instead of using a view child
 */
@Directive({
  selector: '[appPharosCustomContent]'
})

export class CustomContentDirective {

  /**
   * sets a view container that the parent component can interact with
   * @param {ViewContainerRef} viewContainerRef
   */
    constructor(public viewContainerRef: ViewContainerRef) { }

}
