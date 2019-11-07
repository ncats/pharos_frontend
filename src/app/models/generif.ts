import {Serializer} from './pharos-base';
import {Publication, PublicationSerializer} from './publication';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

export class Generif {
  rifid?: number;
  text?: string;
  target?: any;
  publications?: [Publication];
  pubPmids?: any[];
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

    if (json.pubs) {
      obj.pubPmids = json.pubs.map(pub => pub = {pmid: pub.pmid});
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
    const newObj: any = this._mapField(obj);
    newObj.pubPmids = newObj.pubPmids.map(source => source.pmid)
      //console.log(newObj.pubPmids);
                                          . map(pmid => ({...pmid, externalLink: `http://www.ncbi.nlm.nih.gov/pubmed/${pmid.term}`}));


    return newObj;
  }

  private _mapField (obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
      }
    });
    return retObj;
  }
}

