import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Node} from '../models/node';
import {ForceDirectedGraph} from '../models/force-directed-graph';

/**
 * directive to apply d3 draggable behavior to graph
 */
@Directive({
    selector: '[pharosDraggableNode]'
})
export class DraggableDirective implements OnInit {

  /**
   * element that is draggable
   */
    @Input() pharosDraggableNode: Node;

    /**
   * graph object
   */
    @Input() draggableInGraph: ForceDirectedGraph;


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
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.pharosDraggableNode, this.draggableInGraph);
    }
}
