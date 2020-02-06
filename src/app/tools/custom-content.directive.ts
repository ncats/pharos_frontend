import {Directive, Inject, ViewContainerRef} from '@angular/core';

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
   * @param shared
   */
    constructor(
      public viewContainerRef: ViewContainerRef,
      @Inject('AppComponentService') shared
  ) {
      console.log(this);
   //   shared.register(viewContainerRef);
  }

}
