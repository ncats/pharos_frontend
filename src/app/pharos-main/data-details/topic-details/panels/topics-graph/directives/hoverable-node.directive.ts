import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Node} from '../models/node';
import {ForceDirectedGraph} from '../models/force-directed-graph';


/**
 * directive to apply d3 hoverable behavior to node
 */
@Directive({
    selector: '[pharosHoverableNode]'
})

export class HoverableNodeDirective  implements OnInit {
  /**
   * element that is hoverable
   */
    @Input() pharosHoverableNode: Node;
  /**
   * graph object
   */
    @Input()draggableInGraph: ForceDirectedGraph;

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
        this.d3Service.applyHoverableNodeBehaviour(this._element.nativeElement, this.pharosHoverableNode, this.draggableInGraph);
    }
}
