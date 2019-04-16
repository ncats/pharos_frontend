export class PharosBase {
  created:  string;
  deprecated: boolean;
  href: string;
  id: number;
  kind?: string;
  modified:  number;
  version: number;
  _namespace: string;

  static mapDates(obj) {
    obj.created = new Date(obj.created).toLocaleDateString();
    return obj;
  }
}

export interface PharosSerializer extends Serializer {
  fromJson(json: any): PharosBase;
  toJson(object: PharosBase): any;
  _asProperties(object: PharosBase): any;
}

export interface Serializer {
  fromJson(json: any): any;
  toJson(object: any): any;
  _asProperties(object: any): any;
}

export class PharosSubList {
  count: number;
  href: string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
