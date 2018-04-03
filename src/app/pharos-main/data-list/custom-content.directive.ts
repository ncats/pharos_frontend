import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPharosCustomContent]'
})
export class CustomContentDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
