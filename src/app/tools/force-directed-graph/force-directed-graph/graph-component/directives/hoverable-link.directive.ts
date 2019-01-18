import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { PharosD3Service } from '../../../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service';
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
    constructor(private d3Service: PharosD3Service, private _element: ElementRef) { }

  /**
   * apply behavior to graph
   */
    ngOnInit() {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.pharosHoverableLink);
    }
}
