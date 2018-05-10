/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Article, Disease, Drug, Mesh, Node, Protein, Query} from '../../models/node';
import {Subject} from 'rxjs';

@Injectable()
export class NodeService {
  //  Observable navItem source
  private _clickedNodeSource = new Subject<Node>();
  private _hoveredNodeSource = new Subject<any>();
  private _nodeSource = new Subject<any>();
  private  masterNodeMap: Map<string, Node> = new Map();

  //  Observable navItem stream
  lastNode = {};
  clickednode$ = this._clickedNodeSource.asObservable();
  hoverednode$ = this._hoveredNodeSource.asObservable();
  nodeList$ = this._nodeSource.asObservable();

  private clickedNodeList: Node[] = [];
  private hoveredNodeList: Node[] = [];

  //  service command
  clickedNodes(node: Node): void {
    this.clickedNodeList.push(node);
    this._nodeSource.next({
      clicked: this.clickedNodeList,
      hovered: this.hoveredNodeList
    });
    // this will return the single most recent click. That way subscriptions don't updated if hovered nodes change.
    this.changeNode(node);
  }

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

  removeClickedNode(node: Node): void {
    this.clickedNodeList.splice( this.clickedNodeList.indexOf(node), 1);
    this._nodeSource.next({
      clicked: this.clickedNodeList,
      hovered: this.hoveredNodeList
    });
  }



  //  service command
  changeNode(node: Node) {
    this._clickedNodeSource.next(node);
  }

  clearNode(): void {
  this._hoveredNodeSource.next();
}

  getNodes(): Map<string, Node> {
    return this.masterNodeMap;
  }

  getById(id): Node {
    return this.masterNodeMap.get(id);
  }

  setNode(node: Node): void {
   this.masterNodeMap.set(node.uuid, node);
  }

  // searches to see if a node exists. if it does, it returns the node, if it doesn't exist, it makes a new node with the data
  makeNode(id: string, data: any): Node {
    let n: Node = this.masterNodeMap.get(id);
    if (!n) {
      if (data.type) {
      switch (data.type) {
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
    console.log(n);
    return n;
  }






}
