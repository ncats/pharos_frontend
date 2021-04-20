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

  fromJson(json: any, type?: string): T {
    let obj: any;
    switch (type) {
      case 'Antibody': {
        obj = new Antibody(json);
        break;
      }
      case 'Cell': {
        obj = new Cell(json);
        break;
      }
      case 'Genetic Construct': {
        obj = new GeneticConstruct(json);
        break;
      }
      case 'Mouse': {
        obj = new Mouse(json);
        break;
      }
      case 'Small Molecule':
      case 'Chemical Tool':  {
        obj = new SmallMolecule(json);
        break;
      }
      case 'Peptide': {
        obj = new Peptide(json);
        break;
      }
      case 'Mouse Image-based Expression':
      case 'GPCR Mouse Imaging': {
        obj = new MouseImageData(json);
        break;
      }
      case 'Probe': {
        obj = new ProbeData(json);
        break;
      }
      case 'Expression':
      case 'NanoBRET':
      case 'Mouse Phenotype': {
        obj = new Dataset(json);
        break;
      }
    }
    if (!!obj) {obj.resourceType = type; }
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
