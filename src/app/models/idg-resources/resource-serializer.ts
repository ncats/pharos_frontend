import {Serializer} from '../pharos-base';
import {Antibody, Cell, GeneticConstruct, Mouse, Peptide, Reagent, SmallMolecule} from './reagent';
import {DataProperty} from '../../tools/generic-table/components/property-display/data-property';
import {Dataset, MouseImageData, ProbeData} from './data-resource';
import {BaseResource} from './base-resource';

/**
 * mega-serializer to parse node by type and create node using the correct serializers
 */
export class IDGResourceSerializer<T extends BaseResource> implements Serializer {

  /**
   * no args constructor
   */
  constructor() {
  }

  /**
   * create reagent from json object
   * @param json
   * @param name
   * @param type
   */

  fromJson(json: any, name?: string, type?: string): T {
    let obj: any;
    if (name) {
      json.name = name;
    }
    switch (type.replace(' ', '')) {
      case 'Antibody': {
        obj = new Antibody(json);
        break;
      }
      case 'Cell': {
        obj = new Cell(json);
        break;
      }
      case 'GeneticConstruct': {
        obj = new GeneticConstruct(json);
        break;
      }
      case 'Mouse': {
        obj = new Mouse(json);
        break;
      }
      case 'SmallMolecule': {
        obj = new SmallMolecule(json);
        break;
      }
      case 'Peptide': {
        obj = new Peptide(json);
        break;
      }
      case 'MouseImageData': {
        obj = new MouseImageData(json);
        break;
      }
      case 'probe data': {
        obj = new ProbeData(json);
        break;
      }
      case 'NanoBRET': {
        obj = new Dataset(json);
        break;
      }
    }
    return obj;
  }

  /**
   * flatten reagent
   * @param {Reagent} obj
   * @return {any}
   */
  toJson(obj: Reagent): any {
    return [];
  }

  /**
   * return reagent as properties
   * @return {any}
   * @private
   * @param data
   */
  _asProperties(data: T): any {
    const newObj: any = {};
    Object.keys(data).map(field => {
      const property: DataProperty = {name: field, label: field, term: data[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}
