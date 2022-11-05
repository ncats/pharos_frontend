import {Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {Target} from './target';
import gql from 'graphql-tag';

/**
 * publication object
 */
export class Publication {
  /**
   * internal publication id
   */
  id?: number;

  /**
   * pubmed id
   */
  pmid?: number;
  authors?: string;
  /**
   * article title
   */
  title?: string;

  /**
   * journal name
   */
  journal?: string;

  /**
   * date published: YYYY-MM orYYYY-MM-DD
   */
  date?: string;

  fetch_date?: string;

  generifs: any[];

  year: string;
  /**
   * text of abstract
   */
  abstract?: string;

  targetCounts?: number;

  targets?: Target[];


}

/**
 * serializer publication object operations
 */
export class PublicationSerializer implements Serializer {

  /**
   * create publication from json
   * @param obj
   * @param {string} id
   * @return {Publication}
   */
  fromJson(obj: any, id?: string): Publication {
    const newObj = new Publication();
    Object.entries((obj)).forEach((prop) => newObj[prop[0]] = prop[1]);
    if (obj.fetch_date) {
      const date = new Date(parseInt(obj.fetch_date));
      newObj.fetch_date = date.toISOString().split('T')[0];
    }
    if (obj.generifs && obj.generifs.length > 0) {
      newObj.generifs.forEach(rif => {
        const date = new Date(parseInt(rif.date));
        rif.date = date.toISOString().split('T')[0];
      });
    }
    return newObj;
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
  _asProperties(obj: Publication): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      newObj[field] =  new PharosProperty({name: field, label: field, term: obj[field]});
    });
    if (newObj.pmid) {
      newObj.pmid.externalLink = `http://www.ncbi.nlm.nih.gov/pubmed/${obj.pmid}`;
    }
    return newObj;
  }
}



