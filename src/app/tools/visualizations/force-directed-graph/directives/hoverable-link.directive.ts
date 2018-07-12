import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Link} from '../models/link';


/**
 * directive to apply d3 hoverable behavior to link
 */
@Directive({
    selector: '[pharosHoverableLink]'
})
export class HoverableLinkDirective  implements OnInit {
  /**
   * element that is hoverable
   */
    @Input() pharosHoverableLink: Link;

    /**
   * create services
   * @param {D3Service} d3Service
   * @param {ElementRef} _element
   */
    constructor(private d3Service: D3Service, private _element: ElementRef) { }

  /**
   * apply behavior to graph
   */
    ngOnInit() {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.pharosHoverableLink);
    }
}
