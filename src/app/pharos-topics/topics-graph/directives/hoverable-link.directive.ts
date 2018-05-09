import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Link} from '../models/link';
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
    selector: '[hoverableLink]'
})
export class HoverableLinkDirective  implements OnInit {
    @Input('hoverableLink') hoverableLink: Link;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.hoverableLink);
    }
}
