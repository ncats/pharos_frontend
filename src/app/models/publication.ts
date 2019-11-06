import {Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {Target} from './target';
import gql from 'graphql-tag';

/*const PROPERTYLISTFIELDS =  gql`
  fragment listFields on PubMed {
    date
      pmid
      title
      journal
    abstract
  }
`;

const PROPERTYLISTQUERY =  gql`
  fragment listFields on PubMed {
    date
      pmid
      title
      journal
    abstract
  }
`;*/

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
  date?: number;

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



