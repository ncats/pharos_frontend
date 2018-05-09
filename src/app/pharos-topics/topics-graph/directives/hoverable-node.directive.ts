import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Node} from '../models/node';
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
    selector: '[hoverableNode]'
})
export class HoverableNodeDirective  implements OnInit {
    @Input('hoverableNode') hoverableNode: Node;
    @Input('draggableInGraph')draggableInGraph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyHoverableNodeBehaviour(this._element.nativeElement, this.hoverableNode, this.draggableInGraph);
    }
}
