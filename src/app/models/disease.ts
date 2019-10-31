import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

const DISEASELISTFIELDS =  gql`
      fragment diseasesListFields on Disease {
        name
        associationCount
      }
    `;

/**
 * main disease object, mainly list of associated targets
 */
export class Disease extends PharosBase {

  static diseaseListFragments  = DISEASELISTFIELDS;


  /**
   * name of disease
   */
  name: string;

  associationCounts: number;

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
  _asProperties<T extends PharosBase>(obj: Disease): any {
    const newObj: any = this._mapField(obj);

  //  newObj.name.internalLink = ['/diseases', obj.id];
  //  newObj.id.internalLink = ['/diseases', obj.id];
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

