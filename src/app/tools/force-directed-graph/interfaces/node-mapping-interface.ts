export interface NodeMappingInterface <T extends Node>{
  /**
   * map of all nodes all changes are saved here
   * @type {Map<any, any>}
   */
  masterNodeMap: Map<string, T>;

  /**
   * returns all created nodes as a map
   * @return {Map<string, T>}
   */
  getNodes(): Map<string, T>;

  /**
   * fetch node in map
   * @param id
   * @return {T}
   */
  getById(id): T;

  /**
   * set node in map
   * @param {T} node
   */
  setNode(node: T): void;

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param {string} id
   * @param data
   * @return {T}
   */
  makeNode(id: string, data: any): T;

  empty();
}
