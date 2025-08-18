
/**
 * base class of objects (target, disease, ligand) returned by the Pharos Api
 */
export class PharosBase {
  parsed = false;

  _tcrdid: string | number;

  /**
   * id of the object
   */
  id: number;

  /**
   * pharos object model java class
   */
  kind?: string;
}

/**
 * initial serializer, simply sets up methods to be implemented
 */
export interface Serializer {
  /**
   * return classed object from json
   * @param json
   * @return {any}
   */
  fromJson(json: any): any;

  /**
   * return json from classed object
   * @param object
   * @return {any}
   */
  toJson?(object: any): any;

  /**
   * return object as series of property objects
   * @param object
   * @return {any}
   * @private
   */
  _asProperties?(object: any): any;

  parseExtras?(obj: any): any;
}

/**
 * serializer designed to return a Pharos base object, to be extended by other serializers
 */
export interface PharosSerializer extends Serializer {
  /**
   * converts Json object to PharosBase object
   * @param json
   * @return {PharosBase}
   */
  fromJson(json: any): PharosBase;

  /**
   * flattens PharosBase object to Json, probably never used
   * @param {PharosBase} object
   * @return {any}
   */
  toJson?(object: PharosBase): any;

  /**
   * return object as parsed properties
   * @param {PharosBase} object
   * @return {any}
   * @private
   */
  _asProperties?(object: PharosBase): any;

}

/**
 * some pharos objects return the view collapsed, with a helper object consisting of a count and url
 */
export class PharosSubList {
  /**
   * count of associated sub objects
   */
  count: number;

  /**
   * url to expanded view of sub objects
   */
  href: string;

  /**
   * deconstruct object to create typed object
   * @param obj
   */
  constructor(obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
