import {NodeSerializer, SGNode} from 'smrtgraph-core';
import {TargetNodeSerializer} from '../../pharos-main/data-details/topic-details/panels/topic-graph-panel/models/topic-graph/target-node';
import {DiseaseNodeSerializer} from '../../pharos-main/data-details/topic-details/panels/topic-graph-panel/models/topic-graph/disease-node';
import {LigandNodeSerializer} from '../../pharos-main/data-details/topic-details/panels/topic-graph-panel/models/topic-graph/ligand-node';
import {Serializer} from '../pharos-base';
import {Antibody, Cell, GeneticConstruct, Mouse, Peptide, Reagent, SmallMolecule} from './reagent';
import {DataProperty} from '../../tools/generic-table/components/property-display/data-property';
import {MouseImageData, ProbeData} from './data-resource';
import {BaseResource} from './base-resource';

/**
 * mega-serializer to parse node by type and create node using the correct serializers
 */
export class IDGResourceSerializer <T extends BaseResource> implements Serializer {

  /**
   * no args constructor
   */
  constructor () {
  }

/**
 * create reagent from json object
 * @param json
 * @param type
 */

fromJson(json: any, type?: string): T {
  console.log(json);
  let obj: any;
  console.log(type.replace(' ', ''));
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
    case 'dataset': {
      obj = new ProbeData(json);
      break;
    }
  }
  console.log(json);
  console.log(obj);
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
