import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import { D3Service } from '../services/event-tracking/d3.service';
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
    selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
    @Input('zoomableOf') zoomableOf: ElementRef;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) {}

    ngOnInit() {
        this.d3Service.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
    }
}
