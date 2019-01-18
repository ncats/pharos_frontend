import {Observable, Subject} from "rxjs/index";

export interface NodeInterface {
  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, Node>;

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

  /**
   * returns all created nodes as a map
   * @return {Map<string, Node>}
   */
  getNodes(): Map<string, Node>;

  /**
   * fetch node in map
   * @param id
   * @return {Node}
   */
  getById(id): Node;

  /**
   * set node in map
   * @param {Node} node
   */
  setNode(node: Node): void;

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {Node}
   */
  makeNode(id: string, data: any): Node;

  empty();
}
