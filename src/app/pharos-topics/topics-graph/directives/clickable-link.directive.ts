import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {ForceDirectedGraph} from '../models/force-directed-graph';
import {Link} from '../models/link';


@Directive({
    selector: '[clickableLink]'
})
export class ClickableLinkDirective implements OnInit {
    @Input('clickableLink') clickableLink: Link;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;


  constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyClickableLinkBehaviour(this._element.nativeElement, this.clickableLink, this.draggableInGraph);
    }
}
