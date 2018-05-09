import { Injectable } from '@angular/core';


export class Expand {
  all = false;
  compound = false;
  pattern = false;
  predictions = false;
  target = false;

  constructor() {}
}

@Injectable()
export class NodeExpandService {
  private  expandMap: Map<string, Expand> = new Map();

  fetchExpand(node: string): Expand {
    return this.expandMap.get(node) || new Expand();
  }

  setExpand(node: string, expand: Expand): void {
    this.expandMap.set(node, expand);
  }

  constructor() { }

}

