/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Article, Disease, Drug, Mesh, Node, Protein, Query} from '../../models/node';
import {Subject} from 'rxjs';

/**
 * service to create and update nodes
 */
@Injectable()
export class NodeService {
  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  private  masterNodeMap: Map<string, Node> = new Map();

  //  Observable navItem source
  /**
   * RxJs Subject to broadcast changes to a clicked node
   * @type {Subject<Node>}
   * @private
   */
  private _clickedNodeSource = new Subject<Node>();
  /**
   * RxJs Subject to broadcast changes to a hovered node
   * @type {Subject<any>}
   * @private
   */
  private _hoveredNodeSource = new Subject<any>();
  /**
   * RxJs Subject to broadcast changes to both clicked and hovered nodes
   * @type {Subject<any>}
   * @private
   */
  private _nodeSource = new Subject<any>();

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
  private clickedNodeList: Node[] = [];
  /**
   * Node that has been hovered on, wrapped in array. used internally, modified and broadcast through functions
   * @type {any[]}
   */
  private hoveredNodeList: Node[] = [];

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

  /**
   * returns all created nodes as a map
   * @return {Map<string, Node>}
   */
  getNodes(): Map<string, Node> {
    return this.masterNodeMap;
  }

  /**
   * fetch node in map
   * @param id
   * @return {Node}
   */
  getById(id): Node {
    return this.masterNodeMap.get(id);
  }

  /**
   * set node in map
   * @param {Node} node
   */
  setNode(node: Node): void {
   this.masterNodeMap.set(node.uuid, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {Node}
   */
  makeNode(id: string, data: any): Node {
    let n: Node = this.masterNodeMap.get(id);
    if (!n) {
      if (data.properties.type) {
      switch (data.properties.type) {
        case 'article': {
          n = new Article(id, data);
          break;
        }
        case 'query': {
          n = new Query(id, data);
          break;
        }
        case 'mesh': {
          n = new Mesh(id, data);
          break;
        }
        case 'protein': {
          n = new Protein(id, data);
          break;
        }
        case 'disease': {
          n = new Disease(id, data);
          break;
        }
        case 'drug': {
          n = new Drug(id, data);
          break;
        }
        default:
          n = new Node(id, data);
      }
    } else {
        n = new Node(id, data);
      }
    }
    return n;
  }






}
