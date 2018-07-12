import { Injectable } from '@angular/core';

/**
 * Object that tracks what is expanded
 * todo: modify for current project
 */
export class Expand {
  /**
   * show all subgraphs
   * @type {boolean}
   */
  all = false;
  /**
   * show target subgraph
   * @type {boolean}
   */
  target = false;

  constructor() {}
}

/**
 * service that tracks which subgraphs of a node have been expanded on
 */
@Injectable()
export class NodeExpandService {
  private  expandMap: Map<string, Expand> = new Map();

  /**
   *
   * @param {string} node
   * @return {Expand}
   */
  fetchExpand(node: string): Expand {
    return this.expandMap.get(node) || new Expand();
  }

  /**
   * track in a map what node properties have been expanded
   * @param {string} node
   * @param {Expand} expand
   * @return void
   */
  setExpand(node: string, expand: Expand): void {
    this.expandMap.set(node, expand);
  }

  constructor() { }

}

