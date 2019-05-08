/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Node} from '../../../../../../tools/force-directed-graph/fdg-core/graph-component/models/node';
import {NodeInterface} from '../../../../../../tools/force-directed-graph/fdg-core/graph-component/services/event-tracking/node-interface';
import {TargetNodeSerializer} from '../../../../../../models/target-node';
import {DiseaseNodeSerializer} from '../../../../../../models/disease-node';
import {LigandNodeSerializer} from '../../../../../../models/ligand-node';

/**
 * service to create and update nodes
 */
@Injectable({
  providedIn: 'root'
})
export class PharosNodeService implements NodeInterface  {
  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, Node> = new Map<string, Node>();

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
   * serializer to create target nodes
   */
  targetSerializer: TargetNodeSerializer = new TargetNodeSerializer();

  /**
   * serializer to create disease nodes
   */
  diseaseSerializer: DiseaseNodeSerializer = new DiseaseNodeSerializer();

  /**
   * serializer to create ligand nodes
   */
  ligandSerializer: LigandNodeSerializer = new LigandNodeSerializer();

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
   this.masterNodeMap.set(node.id, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {Node}
   */
  makeNode(id: string, data: any): any {
    return null;
    /*console.log(data);
    let serializer: NodeSerializer;
    const dataType: string = data.kind;
   switch (dataType){
      case 'ix.idg.models.Target': {
        serializer = this.targetSerializer;
        let n: TargetNode = this.masterNodeMap.get(id.toString());
        if (!n) {
          n = serializer.fromJson(data);
        } else {
          n = serializer.mergeNodes(n, data);
        }
        return n;
      }
      case 'ix.idg.models.Disease': {
        serializer = this.diseaseSerializer;
        let n: DiseaseNode = this.masterNodeMap.get(id.toString());
        if (!n) {
          n = serializer.fromJson(data);
        } else {
          n = serializer.mergeNodes(n, data);
        }
        return n;
      }
      case 'ix.idg.models.Ligand': {
        serializer = this.ligandSerializer;
        let n: LigandNode = this.masterNodeMap.get(id.toString());
        if (!n) {
          n = serializer.fromJson(data);
        } else {
          n = serializer.mergeNodes(n, data);
        }
        return n;
      }
    }*/
  }

  /**
   * empty node list
   */
  empty() {
    this.masterNodeMap.clear();
  }




}
