import { Injectable } from '@angular/core';

/**
 * Object that tracks what is expanded
 * todo: modify for current project
 */
export class Expand {
  /**
   * show all subgraphs
   */
  all = false;
  /**
   * show target subgraph
   */
  target = false;

  /**
   * no args
   */
  constructor() {}
}

/**
 * service that tracks which subgraphs of a node have been expanded on
 */
@Injectable()
export class NodeExpandService {
  /**
   * map of expanded nodes
   * @type {Map<string, Expand>}
   */
  private  expandMap: Map<string, Expand> = new Map<string, Expand>();

  /**
   *
   * @param node
   */
  fetchExpand(node: string): Expand {
    return this.expandMap.get(node) || new Expand();
  }

  /**
   * track in a map what node properties have been expanded
   * @param node
   * @param expand
   */
  setExpand(node: string, expand: Expand): void {
    this.expandMap.set(node, expand);
  }

  /**
   * no args
   */
  constructor() { }

}

