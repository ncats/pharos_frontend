import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/index';
import {
  Node,
} from '../../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/models/node';
import {NodeInteractionInterface} from '../../../../../../../tools/force-directed-graph/interfaces/node-interaction-interface';

@Injectable({
  providedIn: 'root'
})
export class PharosNodeInteractionService implements NodeInteractionInterface {
  //  Observable navItem source
  /**
   * RxJs Subject to broadcast changes to a clicked node
   * @type {Subject<Node>}
   * @private
   */
  _clickedNodeSource = new Subject<Node>();
  /**
   * RxJs Subject to broadcast changes to a hovered node
   * @type {Subject<any>}
   * @private
   */
  _hoveredNodeSource = new Subject<any>();
  /**
   * RxJs Subject to broadcast changes to both clicked and hovered nodes
   * @type {Subject<any>}
   * @private
   */
  _nodeSource = new Subject<any>();

  /**
   * Observable for other components to subscribe to
   * @type {Observable<Node>}
   */
  clickednode$ = this._clickedNodeSource.asObservable();
  /**
   * Observable for other components to subscribe to
   * @type {Observable<any>}
   */
  nodeList$ = this._nodeSource.asObservable();
  /**
   * List of nodes that have been clicked. used internally, modified and broadcast through functions
   * @type {any[]}
   */
  clickedNodeList: Node[] = [];
  /**
   * Node that has been hovered on, wrapped in array. used internally, modified and broadcast through functions
   * @type {any[]}
   */
  hoveredNodeList: Node[] = [];

  /**
   * Add node to clicked node list
   * @param {Node} node
   */
  clickedNodes(node: Node): void {
    this.clickedNodeList.push(node);
    this._nodeSource.next({
      clicked: this.clickedNodeList,
      hovered: this.hoveredNodeList
    });
    // this will return the single most recent click. That way subscriptions don't updated if hovered nodes change.
    this.changeNode(node);
  }

  /**
   * Add node to hovered list and broascast to subscribers
   * @param {Node[]} node
   */
  hoveredNode(node: Node[]): void {
    // console.log(node);
    if (this.hoveredNodeList.length > 0) {
      this.hoveredNodeList = [];
    }
    this.hoveredNodeList.push(...node);
    this._nodeSource.next({
      clicked: this.clickedNodeList,
      hovered: this.hoveredNodeList
    });
  }

  /**
   * remove node from clicked node display list
   * @param {Node} node
   */
  removeClickedNode(node: Node): void {
    this.clickedNodeList.splice( this.clickedNodeList.indexOf(node), 1);
    this._nodeSource.next({
      clicked: this.clickedNodeList,
      hovered: this.hoveredNodeList
    });
  }

  /**
   * broadcast node click event
   * @param {Node} node
   */
  changeNode(node: Node): void {
    this._clickedNodeSource.next(node);
  }

  /**
   * removes hovered decorations from all nodes
   */
  clearNode(): void {
    this._hoveredNodeSource.next();
  }
}
