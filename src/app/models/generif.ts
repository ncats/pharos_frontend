import {PharosProperty} from './pharos-property';
import {Serializer} from './pharos-base';
import {Publication, PublicationSerializer} from './publication';

export class Generif {
  rifid?: number;
  text?: string;
  target?: any;
  publications?: [Publication];
}


/**
 * serializer publication object operations
 */
export class GenerifSerializer implements Serializer {

  /**
   * create publication from json
   * @param obj
   * @param {string} id
   * @return {Publication}
   */
  fromJson(json: any, id?: string): Generif {
    const obj = new Generif();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if (json.pubs) {
      const pubSerializer = new PublicationSerializer();
      obj.publications = json.pubs.map(pub => pubSerializer.fromJson(pub));
    }
    return obj;
  }

  /**
   * flattern publication
   */
  toJson() {}

  /**
   * return publication as properties
   * @param {Publication} obj
   * @return {any}
   * @private
   */
  _asProperties(obj: Generif): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      newObj[field] =  new PharosProperty({name: field, label: field, term: obj[field]});
    });
    if (newObj.publications) {
      const pubSerializer = new PublicationSerializer();
      newObj.publications = obj.publications.map(pub => pubSerializer._asProperties(pub));
    }

    return newObj;
  }
}

