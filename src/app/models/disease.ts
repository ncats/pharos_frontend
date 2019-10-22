import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import gql from 'graphql-tag';

/**
 * main disease object, mainly list of associated targets
 */
export class Disease extends PharosBase {
  static fragments = {
    listFields: gql`
      fragment listFields on Disease {
        type
        name
        did
        description
        drug
        targetCounts{
          name
          value
        }
        source
        reference
      }
    `,
  };

  /**
   * name of disease
   */
  name: string;
  /**
   * description of disease
   */
  description?: string;
  /**
   * sublist object for links
   */
  _links: PharosSubList;

  /**
   * links count
   */
  _linksCount: number;
  /**
   * sublist object for properties
   */
  _properties: PharosSubList;

  /**
   * properties count
   */
  _propertiesCount: number;
  /**
   * sublist object for synonyms
   */
  _synonyms: PharosSubList;

  /**
   * synonyms count
   */
  _synonymsCount: number;

  /**
   * sublist object for publications
   */
  _publications: PharosSubList;

  /**
   * count of publications
   */
  _publicationsCount: number;
}

/**
 * serializer for a disease object
 */
export class DiseaseSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * return disease object from json, mapping sublists
   * @param json
   * @return {Disease}
   */
  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if (obj._links) {
      obj._links = new PharosSubList(obj._links);
      obj._linksCount = obj._links.count;
    }
    if (obj._properties) {
      obj._properties = new PharosSubList(obj._properties);
      obj._propertiesCount = obj._properties.count;
    }
    if (obj._synonyms) {
      obj._synonyms = new PharosSubList(obj._synonyms);
      obj._synonymsCount = obj._synonyms.count;
    }
    if (obj._publications) {
      obj._publications = new PharosSubList(obj._publications);
      obj._publicationsCount = obj._publications.count;
    }
    return obj;
  }

  /**
   * flatten object to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return properties from object
   * @param {Disease} disease
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(disease: Disease): any {
    const newObj: any = {};
    Object.keys(disease).map(field => {
      const property: PharosProperty = {name: field, label: field, term: disease[field]};
      newObj[field] = property;
    });
    newObj.name.internalLink = ['/diseases', disease.id];
    newObj.id.internalLink = ['/diseases', disease.id];
    return newObj;
  }
}

