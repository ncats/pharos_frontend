import {Observable, Subject} from 'rxjs/index';
import {Node} from '../force-directed-graph/graph-component/models/node';

export interface NodeInteractionInterface {

  //  Observable navItem source
  /**
   * RxJs Subject to broadcast changes to a clicked node
   * @type {Subject<Node>}
   * @private
   */
  _clickedNodeSource: Subject<Node>;
  /**
   * RxJs Subject to broadcast changes to a hovered node
   * @type {Subject<any>}
   * @private
   */
  _hoveredNodeSource: Subject<any>;
  /**
   * RxJs Subject to broadcast changes to both clicked and hovered nodes
   * @type {Subject<any>}
   * @private
   */
  _nodeSource: Subject<any>;

  /**
   * Observable for other components to subscribe to
   * @type {Observable<Node>}
   */
  clickednode$: Observable<Node>;
  /**
   * Observable for other components to subscribe to
   * @type {Observable<any>}
   */
  nodeList$: Observable<Node>;
  /**
   * List of nodes that have been clicked. used internally, modified and broadcast through functions
   * @type {any[]}
   */
  clickedNodeList: Node[];
  /**
   * Node that has been hovered on, wrapped in array. used internally, modified and broadcast through functions
   * @type {any[]}
   */
  hoveredNodeList: Node[];

  /**
   * Add node to clicked node list
   * @param {Node} node
   */
  clickedNodes(node: Node): void;


  /**
   * Add node to hovered list and broascast to subscribers
   * @param {Node[]} node
   */
  hoveredNode(node: Node[]): void;

  /**
   * remove node from clicked node display list
   * @param {Node} node
   */
  removeClickedNode(node: Node): void;

  /**
   * broadcast node click event
   * @param {Node} node
   */
  changeNode(node: Node): void;

  /**
   * removes hovered decorations from all nodes
   */
  clearNode(): void;
}
