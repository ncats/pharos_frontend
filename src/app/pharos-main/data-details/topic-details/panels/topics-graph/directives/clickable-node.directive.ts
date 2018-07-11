import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {Node} from '../models/node';
import {ForceDirectedGraph} from '../models/force-directed-graph';

/**
 * directive to apply d3 clickable behavior to node
 */
@Directive({
  selector: '[pharosClickableNode]'
})
export class ClickableNodeDirective implements OnInit {
  /**
   * element that is clickable
   */
  @Input() pharosClickableNode: Node;

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
    this.d3Service.applyClickableNodeBehaviour(this._element.nativeElement, this.pharosClickableNode, this.draggableInGraph);
  }
}
