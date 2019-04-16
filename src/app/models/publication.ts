import {PharosBase, Serializer} from "./pharos-base";
import {PharosProperty} from "./pharos-property";

export class PublicationSerializer implements Serializer {

  fromJson(obj: any, id?: string): Publication {
    const node = new Publication();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }

  toJson(){}

  _asProperties(obj: any): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = {name: field, label: field, term: obj[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}


export class Publication {
  id?: number;
  pmid?: number;
  pmcid?: number;
  title?: string;
  year?: number;
  pages?: string;
  doi?: string;
  keywords?: string[];
  mesh?: string[];
  abstractText?: string;
  journal?: string;
  figures?: string;
  _authors?: string;
}
