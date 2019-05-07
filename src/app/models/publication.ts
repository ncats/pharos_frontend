import {Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

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
   * pmcid
   */
  pmcid?: number;

  /**
   * pbulication/article title
   */
  title?: string;

  /**
   * year published
   */
  year?: number;

  /**
   * pages in issue
   */
  pages?: string;

  /**
   * doi link
   */
  doi?: string;

  /**
   * article keywords
   */
  keywords?: string[];

  /**
   * mesh terms
   */
  mesh?: string[];

  /**
   * text of abstract
   */
  abstractText?: string;

  /**
   * journal name
   */
  journal?: string;

  /**
   * urls to figures
   */
  figures?: string;

  /**
   * list of authors
   */
  _authors?: string;
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
    const node = new Publication();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
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



