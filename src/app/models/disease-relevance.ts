import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

/**
 * object that maps a disease name to a list of links with evidence info
 */
export class DiseaseRelevance extends PharosBase {
  /**
   * list of properties for disease relevance
   */
  properties: Array<PharosProperty> = [];
  /**
   * id or name of disease
   */
  refid: string;
}

/**
 * create a Disease Relevance object from JSON
 */
export class DiseaseRelevanceSerializer implements PharosSerializer {

  /**
   *  * create a Disease Relevance object from JSON
   * @param json
   */
  fromJson(json: any): DiseaseRelevance {
    const obj = new DiseaseRelevance();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    obj.properties = obj.properties.map(prop => prop = new PharosProperty(prop));
    const disease = obj.properties.filter(prop => prop.label === 'IDG Disease')[0];
    disease.internalLink = ['/diseases', obj.refid];
    return obj;
  }

  /**
   * flatten disease relevance object
   * @param obj
   */
  toJson(obj: DiseaseRelevance): any {
    return [];
  }

  /**
   * return a new object of pharos properties
   * @param obj
   */
  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = new PharosProperty({name: field, label: field, term: obj[field]});
      newObj[field] = property;
    });
    return newObj;
  }
}

